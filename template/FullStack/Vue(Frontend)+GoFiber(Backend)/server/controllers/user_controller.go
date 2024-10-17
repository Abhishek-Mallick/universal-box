package controllers

import (
	"server/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

type UserController struct{}

func NewUserController() *UserController {
	return &UserController{}
}

func (uc *UserController) Test(c *fiber.Ctx) error {
	// API status check
	return c.JSON(fiber.Map{"message": "API is working!"})
}

func (uc *UserController) Signout(c *fiber.Ctx) error {
	// Clear the user session by removing the access token
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "strict",
		Path:     "/",
	})
	return c.JSON(fiber.Map{"success": true, "message": "User has been signed out!"})
}

func (uc *UserController) GetProfile(c *fiber.Ctx) error {
	// Fetch the current user's profile details
	userID := c.Locals("userId").(uint)

	var user models.User
	if err := models.DB.First(&user, userID).Error; err != nil {
		return fiber.NewError(fiber.StatusNotFound, "User not found")
	}

	// Return user profile information
	return c.JSON(fiber.Map{
		"success": true,
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"emailid":  user.Email,
		},
	})
}
