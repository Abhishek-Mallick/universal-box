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

// endpoint to check API status
func (uc *UserController) Test(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "API is working!"})
}

// endpoint to clear user session
func (uc *UserController) Signout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "strict",
		Path:     "/",
	})
	return c.JSON(fiber.Map{"success": true, "message": "User has been signed out!!"})
}

// endpoint to fetch user details
func (uc *UserController) GetProfile(c *fiber.Ctx) error {
	userID := c.Locals("userId").(uint)

	var user models.User
	if err := models.DB.First(&user, userID).Error; err != nil {
		return fiber.NewError(fiber.StatusNotFound, "User not found")
	}

	return c.JSON(fiber.Map{
		"success": true,
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"emailid":  user.Email,
		},
	})
}
