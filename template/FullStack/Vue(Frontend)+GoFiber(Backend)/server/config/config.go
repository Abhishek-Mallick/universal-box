package config

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

var (
	config map[string]string
	once   sync.Once
)

func Load() {
	// Load configuration once, use env variables if available
	once.Do(func() {
		err := godotenv.Load()
		if err != nil {
			log.Println("No .env file found, using environment variables")
		}

		// Populate configuration map
		config = make(map[string]string)
		config["PORT"] = getEnv("PORT", "3000")
		config["POSTGRES_URL"] = getEnv("POSTGRES_URL", "")
		config["JWT_SECRET"] = getEnv("JWT_SECRET", "")
		config["ALLOWED_ORIGINS"] = getEnv("ALLOWED_ORIGINS", "http://localhost:5173")
		config["ADMIN_USERNAME"] = getEnv("ADMIN_USERNAME", "admin")
		config["ADMIN_EMAIL"] = getEnv("ADMIN_EMAIL", "admin@example.com")
		config["ADMIN_PASSWORD"] = getEnv("ADMIN_PASSWORD", "")

		// Log loaded configuration
		log.Println("Configuration loaded successfully")
		log.Printf("PORT: %s", config["PORT"])
		log.Printf("POSTGRES_URL: %s", maskPassword(config["POSTGRES_URL"]))
		log.Printf("ALLOWED_ORIGINS: %s", config["ALLOWED_ORIGINS"])
		log.Printf("ADMIN_USERNAME: %s", config["ADMIN_USERNAME"])
		log.Printf("ADMIN_EMAIL: %s", config["ADMIN_EMAIL"])
	})
}

func Get(key string) string {
	// Retrieve a config value by key
	return config[key]
}

func getEnv(key, fallback string) string {
	// Get environment variable or fallback if not set
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	if fallback == "" {
		log.Fatalf("%s is not set in the environment", key)
	}
	return fallback
}

func maskPassword(url string) string {
	return "postgres://*****:*****@*****"
}
