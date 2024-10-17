package main

import (
	"log"
	"server/config"
	"server/middleware"
	"server/models"
	"server/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	// Load app configuration
	config.Load()

	// Connect to database
	if err := models.ConnectDB(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Create new Fiber instance with custom error handler
	app := fiber.New(fiber.Config{
		ErrorHandler: middleware.ErrorHandler,
	})

	// Middleware setup (logging, CORS)
	app.Use(middleware.Logger())
	app.Use(middleware.Cors())

	// Setup routes
	routes.SetupRoutes(app)

	// Start server on configured port
	port := config.Get("PORT")
	log.Fatal(app.Listen(":" + port))
}
