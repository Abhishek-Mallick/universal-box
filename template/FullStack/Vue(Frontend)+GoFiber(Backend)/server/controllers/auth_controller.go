package controllers

import (
	"server/config"
	"server/models"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

// Handles user registration
func (ac *AuthController) Signup(c *fiber.Ctx) error {
	var user models.User
	// Parse request body
	if err := c.BodyParser(&user); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Cannot parse JSON")
	}

	// Validate user input
	if err := user.Validate(); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Error encrypting password")
	}
	user.Password = string(hashedPassword)

	// Save user to database
	if err := models.DB.Create(&user).Error; err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Error creating user")
	}

	return c.JSON(fiber.Map{"success": true, "message": "Signup successful!"})
}

// Handles user authentication
func (ac *AuthController) Signin(c *fiber.Ctx) error {
	var req struct {
		Email    string `json:"emailid"`
		Password string `json:"password"`
	}

	// Parse request body
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Cannot parse JSON")
	}

	// Check for empty fields
	if req.Email == "" || req.Password == "" {
		return fiber.NewError(fiber.StatusBadRequest, "All fields are required")
	}

	// Find user by email
	var user models.User
	if err := models.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid email or password")
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid email or password")
	}

	// Generate JWT token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	t, err := token.SignedString([]byte(config.Get("JWT_SECRET")))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Could not login")
	}

	// Set cookie
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    t,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   false, // true in production
		SameSite: "strict",
	})

	// Return user info
	return c.JSON(fiber.Map{
		"success": true,
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"emailid":  user.Email,
		},
	})
}
