package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupSnippetRoutes(router fiber.Router) {
	snippet := router.Group("/snippets")
	snippetController := controllers.NewSnippetController()

	// Public routes
	snippet.Get("/", snippetController.GetSnippets)
	snippet.Get("/languages", snippetController.GetLanguages)

	// Protected routes
	snippet.Use(middleware.VerifyToken)
	snippet.Get("/user", snippetController.GetUserSnippets)
	snippet.Get("/:id", snippetController.GetSnippet)
	snippet.Post("/", snippetController.CreateSnippet)
	snippet.Put("/:id", snippetController.UpdateSnippet)
	snippet.Delete("/:id", snippetController.DeleteSnippet)
}
