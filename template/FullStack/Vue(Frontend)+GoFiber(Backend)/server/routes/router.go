package routes

import (
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	SetupAuthRoutes(api)
	SetupUserRoutes(api)
	SetupSnippetRoutes(api)
}
