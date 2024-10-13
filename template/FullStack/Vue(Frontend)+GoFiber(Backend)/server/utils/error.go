package utils

import (
	"github.com/gofiber/fiber/v2"
)

// global error handling
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

// sends a JSON error with custom code and message
func ErrorResponse(c *fiber.Ctx, code int, message string) error {
	return c.Status(code).JSON(fiber.Map{
		"success":    false,
		"statusCode": code,
		"message":    message,
	})
}
