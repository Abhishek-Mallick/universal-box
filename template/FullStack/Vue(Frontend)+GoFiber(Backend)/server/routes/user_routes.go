package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

// configures user endpoints
func SetupUserRoutes(router fiber.Router) {
	user := router.Group("/user")
	userController := controllers.NewUserController()

	// Public
	user.Get("/test", userController.Test)
	user.Post("/signout", userController.Signout)

	// Protected
	user.Get("/profile", middleware.VerifyToken, userController.GetProfile)
}
