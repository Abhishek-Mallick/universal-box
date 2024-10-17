package middleware

import (
	"server/config"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Cors() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get request origin and allowed origins from config
		origin := c.Get("Origin")
		allowedOrigins := strings.Split(config.Get("ALLOWED_ORIGINS"), ",")

		// Set CORS headers if the origin is allowed
		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				c.Set("Access-Control-Allow-Origin", origin)
				break
			}
		}

		// Set other CORS headers
		c.Set("Access-Control-Allow-Credentials", "true")
		c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH")
		c.Set("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With")

		// Handle preflight OPTIONS request
		if c.Method() == fiber.MethodOptions {
			return c.SendStatus(fiber.StatusNoContent)
		}

		return c.Next()
	}
}
