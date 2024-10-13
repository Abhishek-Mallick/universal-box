package middleware

import (
	"server/config"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

// Verifies JWT token and sets user ID
func VerifyToken(c *fiber.Ctx) error {
	// Extract token from cookie
	tokenString := c.Cookies("access_token")
	if tokenString == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "Unauthorized")
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Verify signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.NewError(fiber.StatusUnauthorized, "Unexpected signing method")
		}
		return []byte(config.Get("JWT_SECRET")), nil
	})

	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid Token")
	}

	// Extract claims and set user ID
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userIDFloat, ok := claims["id"].(float64)
		if !ok {
			return fiber.NewError(fiber.StatusUnauthorized, "Invalid Token")
		}
		userID := uint(userIDFloat)
		c.Locals("userId", userID)
		return c.Next()
	}

	return fiber.NewError(fiber.StatusUnauthorized, "Invalid Token")
}
