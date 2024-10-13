package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

// Configure authentication endpoints
func SetupAuthRoutes(router fiber.Router) {
	auth := router.Group("/auth")
	authController := controllers.NewAuthController()

	// Authentication routes
	auth.Post("/signup", authController.Signup)
	auth.Post("/signin", authController.Signin)
}
