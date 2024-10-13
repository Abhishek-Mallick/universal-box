package middleware

import (
	"server/config"

	"github.com/gofiber/fiber/v2"
)

// Global error handler
func ErrorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	message := "Internal Server Error"

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
		message = e.Message
	}

	return c.Status(code).JSON(fiber.Map{
		"success":    false,
		"statusCode": code,
		"message":    message,
	})
}

// Logger middleware (extend as needed)
func Logger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.Next()
	}
}

// CORS middleware
func Cors() fiber.Handler {
	return func(c *fiber.Ctx) error {
		clientURL := config.Get("CLIENT_URL")
		c.Set("Access-Control-Allow-Origin", clientURL)
		c.Set("Access-Control-Allow-Credentials", "true")

		if c.Method() == "OPTIONS" {
			c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
			c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			return c.SendStatus(fiber.StatusNoContent)
		}

		return c.Next()
	}
}
