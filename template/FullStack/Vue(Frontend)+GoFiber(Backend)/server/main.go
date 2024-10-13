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
	// env variables
	config.Load()

	// db connection
	models.ConnectDB()

	// Fiber app with custom error handler
	app := fiber.New(fiber.Config{
		ErrorHandler: middleware.ErrorHandler,
	})

	// global middleware
	app.Use(middleware.Logger())
	app.Use(middleware.Cors())

	// API routes
	routes.SetupRoutes(app)

	// Start the server
	port := config.Get("PORT")
	log.Fatal(app.Listen(":" + port))
}
