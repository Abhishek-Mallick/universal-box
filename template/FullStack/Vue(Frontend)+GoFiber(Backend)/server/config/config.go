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

// Loads .env
func Load() {
	once.Do(func() {
		err := godotenv.Load()
		if err != nil {
			log.Println("No .env file found")
		}

		config = make(map[string]string)
		config["PORT"] = getEnv("PORT", "3000")
		config["POSTGRES_URL"] = getEnv("POSTGRES_URL", "")
		config["JWT_SECRET"] = getEnv("JWT_SECRET", "")
		config["CLIENT_URL"] = getEnv("CLIENT_URL", "http://localhost:5173")
	})
}

// Retrieves a config value by key
func Get(key string) string {
	return config[key]
}

// Gets env var
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	if fallback == "" {
		log.Fatalf("%s is not set in the environment", key)
	}
	return fallback
}
