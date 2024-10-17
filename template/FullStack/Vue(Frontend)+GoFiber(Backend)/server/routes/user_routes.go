package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(router fiber.Router) {
	// configures user endpoints
	user := router.Group("/user")
	userController := controllers.NewUserController()

	// Public
	user.Get("/test", userController.Test)
	user.Post("/signout", userController.Signout)

	// Protected
	user.Get("/profile", middleware.VerifyToken, userController.GetProfile)
}
