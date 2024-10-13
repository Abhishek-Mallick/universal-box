package routes

import (
	"github.com/gofiber/fiber/v2"
)

// Initializes all API routes
func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Register route groups
	SetupAuthRoutes(api)
	SetupUserRoutes(api)
}
