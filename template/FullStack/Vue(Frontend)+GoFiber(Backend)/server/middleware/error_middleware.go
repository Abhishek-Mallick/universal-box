package middleware

import (
	"github.com/gofiber/fiber/v2"
)

// AppError is a custom error type for application-specific errors
type AppError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e AppError) Error() string {
	return e.Message
}

// ErrorHandler is a global error handler middleware
func ErrorHandler(c *fiber.Ctx, err error) error {
	// Default to 500 Internal Server Error
	code := fiber.StatusInternalServerError
	message := "Internal Server Error"

	// Check if it's our custom AppError
	if e, ok := err.(AppError); ok {
		code = e.Code
		message = e.Message
	} else if e, ok := err.(*fiber.Error); ok {
		// It's a Fiber error
		code = e.Code
		message = e.Message
	}

	// Send JSON response
	return c.Status(code).JSON(fiber.Map{
		"success": false,
		"error": fiber.Map{
			"code":    code,
			"message": message,
		},
	})
}

// NewError creates a new AppError
func NewError(code int, message string) AppError {
	// Return a new instance of AppError with the provided code and message
	return AppError{
		Code:    code,
		Message: message,
	}
}

// ErrorResponse sends a JSON error with custom code and message
func ErrorResponse(c *fiber.Ctx, code int, message string) error {
	// Send a JSON response with the provided code and message
	return c.Status(code).JSON(fiber.Map{
		"success": false,
		"error": fiber.Map{
			"code":    code,
			"message": message,
		},
	})
}

// Logger middleware for logging requests
func Logger() fiber.Handler {
	// Middleware function that logs requests
	return func(c *fiber.Ctx) error {
		// Continue to the next middleware/handler
		return c.Next()
	}
}
