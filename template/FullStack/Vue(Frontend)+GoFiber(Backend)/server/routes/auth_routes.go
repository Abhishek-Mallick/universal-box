package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupAuthRoutes(router fiber.Router) {
	// Authentication endpoints
	auth := router.Group("/auth")
	authController := controllers.NewAuthController()

	// Authentication routes
	auth.Post("/signup", authController.Signup)
	auth.Post("/signin", authController.Signin)
}
