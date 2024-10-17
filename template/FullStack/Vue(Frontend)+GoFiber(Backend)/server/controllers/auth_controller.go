package controllers

import (
	"errors"
	"server/config"
	"server/middleware"
	"server/models"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Define input structs
type SignupInput struct {
	Username string `json:"username"`
	Email    string `json:"emailid"`
	Password string `json:"password"`
}

type SigninInput struct {
	Email    string `json:"emailid"`
	Password string `json:"password"`
}

type AuthController struct{}

// Factory function for creating new AuthController instances
func NewAuthController() *AuthController {
	return &AuthController{}
}

func (ac *AuthController) Signup(c *fiber.Ctx) error {
	// Parse and validate user data for signup
	var input SignupInput
	if err := c.BodyParser(&input); err != nil {
		return middleware.NewError(fiber.StatusBadRequest, "Cannot parse JSON")
	}

	// Map input to User model
	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	}

	if err := user.Validate(); err != nil {
		return middleware.NewError(fiber.StatusBadRequest, err.Error())
	}

	// Hash user password and create the user
	if err := hashPassword(&user); err != nil {
		return err
	}

	if err := createUser(&user); err != nil {
		return err
	}

	return c.JSON(fiber.Map{"success": true, "message": "Signup successful!"})
}

func (ac *AuthController) Signin(c *fiber.Ctx) error {
	// Parse credentials and authenticate user for signin
	var credentials SigninInput
	if err := c.BodyParser(&credentials); err != nil {
		return middleware.NewError(fiber.StatusBadRequest, "Cannot parse JSON")
	}
	if credentials.Email == "" || credentials.Password == "" {
		return middleware.NewError(fiber.StatusBadRequest, "Email and password are required")
	}

	user, err := authenticateUser(credentials)
	if err != nil {
		return err
	}

	// Generate JWT token and set it in the auth cookie
	token, err := generateToken(user.ID)
	if err != nil {
		return err
	}

	setAuthCookie(c, token)

	return c.JSON(fiber.Map{
		"success": true,
		"user":    formatUserResponse(user),
	})
}

// Helper functions

func hashPassword(user *models.User) error {
	// Hash user password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return middleware.NewError(fiber.StatusInternalServerError, "Error encrypting password")
	}
	user.Password = string(hashedPassword)
	return nil
}

func createUser(user *models.User) error {
	// Create a new user record in the database
	if err := models.DB.Create(user).Error; err != nil {
		if err == gorm.ErrDuplicatedKey {
			return middleware.NewError(fiber.StatusConflict, "User with this email or username already exists")
		}
		return middleware.NewError(fiber.StatusInternalServerError, "Error creating user")
	}
	return nil
}

func authenticateUser(creds SigninInput) (models.User, error) {
	// Authenticate user by email and password
	var user models.User
	if err := models.DB.Where("email = ?", creds.Email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return user, middleware.NewError(fiber.StatusUnauthorized, "Invalid email or password")
		}
		return user, middleware.NewError(fiber.StatusInternalServerError, "Error finding user")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		return user, middleware.NewError(fiber.StatusUnauthorized, "Invalid email or password")
	}

	return user, nil
}

func generateToken(userID uint) (string, error) {
	// Generate JWT token with user ID as claim
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = userID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	t, err := token.SignedString([]byte(config.Get("JWT_SECRET")))
	if err != nil {
		return "", middleware.NewError(fiber.StatusInternalServerError, "Could not generate token")
	}
	return t, nil
}

func setAuthCookie(c *fiber.Ctx, token string) {
	// Set JWT token in a cookie for authentication
	c.Cookie(&fiber.Cookie{
		Name:     "access_token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   false, // Set to true in production
		SameSite: "strict",
		Path:     "/",
	})
}

func formatUserResponse(user models.User) fiber.Map {
	// Format user data for the response
	return fiber.Map{
		"id":       user.ID,
		"username": user.Username,
		"emailid":  user.Email,
	}
}
