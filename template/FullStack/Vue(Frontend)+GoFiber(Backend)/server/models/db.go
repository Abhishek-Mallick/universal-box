package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"server/config"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/yaml.v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type LanguagesData struct {
	Languages []string `json:"languages"`
}

type SnippetsData struct {
	Snippets []Snippet `yaml:"snippets"`
}

func ConnectDB() error {
	// Initialize DB connection and migrate schema
	db, err := initializeDatabase()
	if err != nil {
		return err
	}

	if err := migrateSchema(db); err != nil {
		return err
	}

	DB = db
	log.Println("Connected to PostgreSQL and migrated schema")

	// Seed initial data
	if err := seedData(); err != nil {
		return err
	}

	return nil
}

func initializeDatabase() (*gorm.DB, error) {
	// Set up PostgreSQL connection
	dsn := config.Get("POSTGRES_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	return db, nil
}

func migrateSchema(db *gorm.DB) error {
	// Auto-migrate the schema for User, Snippet, and Language models
	if err := db.AutoMigrate(&User{}, &Snippet{}, &Language{}); err != nil {
		return fmt.Errorf("failed to migrate database: %w", err)
	}
	return nil
}

func seedData() error {
	// Seed languages, admin user, and snippets
	if err := seedLanguages(); err != nil {
		return fmt.Errorf("failed to seed languages: %w", err)
	}

	if err := seedAdminUser(); err != nil {
		return fmt.Errorf("failed to seed admin user: %w", err)
	}

	if err := seedSnippets(); err != nil {
		return fmt.Errorf("failed to seed snippets: %w", err)
	}

	return nil
}

func seedLanguages() error {
	// Seed language data if not already present
	if hasExistingData(&Language{}) {
		log.Println("Languages already exist in the database. Skipping seeding.")
		return nil
	}

	languages, err := loadLanguagesFromFile()
	if err != nil {
		return err
	}

	for _, lang := range languages {
		if err := createLanguage(lang); err != nil {
			log.Printf("Error creating language %s: %v", lang, err)
		} else {
			log.Printf("Successfully added language: %s", lang)
		}
	}

	log.Println("Languages have been seeded successfully")
	return nil
}

func seedAdminUser() error {
	// Seed admin user if no users exist
	if hasExistingData(&User{}) {
		log.Println("Users already exist in the database. Skipping admin user creation.")
		return nil
	}

	adminUser, err := createAdminUser()
	if err != nil {
		return fmt.Errorf("failed to create admin user: %w", err)
	}

	if err := DB.Create(adminUser).Error; err != nil {
		return fmt.Errorf("failed to save admin user: %w", err)
	}

	log.Println("Admin user created successfully")
	return nil
}

func seedSnippets() error {
	// Seed snippets if no snippets exist
	if hasExistingData(&Snippet{}) {
		log.Println("Snippets already exist in the database. Skipping seeding.")
		return nil
	}

	snippets, err := loadSnippetsFromFile()
	if err != nil {
		return err
	}

	adminUser, err := findAdminUser()
	if err != nil {
		return err
	}

	for _, snippet := range snippets {
		if err := createSnippet(&snippet, adminUser.ID); err != nil {
			log.Printf("Error creating snippet %s: %v", snippet.Name, err)
		} else {
			log.Printf("Successfully added snippet: %s", snippet.Name)
		}
	}

	log.Println("Sample snippets have been seeded successfully")
	return nil
}

// Helper functions

func hasExistingData(model interface{}) bool {
	// Check if data already exists in the specified model
	var count int64
	DB.Model(model).Count(&count)
	return count > 0
}

func loadLanguagesFromFile() ([]string, error) {
	// Load languages from JSON file
	jsonFile, err := os.Open("data/languages.json")
	if err != nil {
		return nil, fmt.Errorf("failed to open languages file: %w", err)
	}
	defer jsonFile.Close()

	var languagesData LanguagesData
	byteValue, _ := ioutil.ReadAll(jsonFile)
	if err := json.Unmarshal(byteValue, &languagesData); err != nil {
		return nil, fmt.Errorf("failed to unmarshal languages data: %w", err)
	}

	return languagesData.Languages, nil
}

func createLanguage(name string) error {
	// Create new language entry
	return DB.Create(&Language{Name: name}).Error
}

func createAdminUser() (*User, error) {
	// Create admin user with credentials from configuration
	adminUsername := config.Get("ADMIN_USERNAME")
	adminEmail := config.Get("ADMIN_EMAIL")
	adminPassword := config.Get("ADMIN_PASSWORD")

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash admin password: %w", err)
	}

	return &User{
		Username: adminUsername,
		Email:    adminEmail,
		Password: string(hashedPassword),
	}, nil
}

func loadSnippetsFromFile() ([]Snippet, error) {
	// Load snippets from YAML file
	yamlFile, err := ioutil.ReadFile("data/snippets.yaml")
	if err != nil {
		return nil, fmt.Errorf("failed to read snippets file: %w", err)
	}

	var snippetsData SnippetsData
	if err := yaml.Unmarshal(yamlFile, &snippetsData); err != nil {
		return nil, fmt.Errorf("failed to unmarshal snippets data: %w", err)
	}

	return snippetsData.Snippets, nil
}

func findAdminUser() (User, error) {
	// Find admin user by username
	var adminUser User
	if err := DB.Where("username = ?", config.Get("ADMIN_USERNAME")).First(&adminUser).Error; err != nil {
		return adminUser, fmt.Errorf("failed to find admin user: %w", err)
	}
	return adminUser, nil
}

func createSnippet(snippet *Snippet, adminUserID uint) error {
	// Create new snippet and associate with admin user
	snippet.UserID = adminUserID
	snippet.Visibility = true // Ensure all initial snippets are public
	return DB.Create(snippet).Error
}
