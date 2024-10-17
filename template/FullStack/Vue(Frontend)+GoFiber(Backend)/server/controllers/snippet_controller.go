package controllers

import (
	"server/middleware"
	"server/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type SnippetController struct{}

// creating a new SnippetController
func NewSnippetController() *SnippetController {
	return &SnippetController{}
}

func (sc *SnippetController) GetSnippets(c *fiber.Ctx) error {
	// Get all visible snippets with associated users
	snippets, err := fetchSnippets(models.DB.Where("visibility = ?", true).Preload("User"))
	if err != nil {
		return handleDatabaseError(err, "Error fetching snippets")
	}
	return c.JSON(fiber.Map{"success": true, "snippets": snippets})
}

func (sc *SnippetController) GetUserSnippets(c *fiber.Ctx) error {
	// Get snippets for the current authenticated user
	userID := extractUserID(c)
	snippets, err := fetchSnippets(models.DB.Where("user_id = ?", userID).Preload("User"))
	if err != nil {
		return handleDatabaseError(err, "Error fetching user snippets")
	}
	return c.JSON(fiber.Map{"success": true, "snippets": snippets})
}

func (sc *SnippetController) GetSnippet(c *fiber.Ctx) error {
	// Get a single snippet by ID
	id := c.Params("id")
	snippet, err := fetchSingleSnippet(id)
	if err != nil {
		return err
	}

	if !snippet.Visibility && !isAuthorized(c, snippet.UserID) {
		return middleware.NewError(fiber.StatusForbidden, "You don't have permission to view this snippet")
	}
	return c.JSON(fiber.Map{"success": true, "snippet": snippet})
}

func (sc *SnippetController) CreateSnippet(c *fiber.Ctx) error {
	// Create new snippet for the current authenticated user
	input, err := parseSnippetInput(c)
	if err != nil {
		return err
	}

	userID := extractUserID(c)
	if err := validateUser(userID); err != nil {
		return err
	}

	snippet := createSnippetFromInput(input, userID)
	if err := models.DB.Create(&snippet).Error; err != nil {
		return handleDatabaseError(err, "Error creating snippet")
	}
	// Preload User data
	if err := models.DB.Preload("User").First(&snippet, snippet.ID).Error; err != nil {
		return handleDatabaseError(err, "Error fetching snippet with user data")
	}
	return c.JSON(fiber.Map{"success": true, "snippet": snippet})
}

func (sc *SnippetController) UpdateSnippet(c *fiber.Ctx) error {
	// Update an existing snippet
	id := c.Params("id")
	userID := extractUserID(c)

	existingSnippet, err := fetchSingleSnippet(id)
	if err != nil {
		return err
	}

	if existingSnippet.UserID != userID {
		return middleware.NewError(fiber.StatusForbidden, "You don't have permission to update this snippet")
	}

	input, err := parseSnippetInput(c)
	if err != nil {
		return err
	}

	updateSnippetFromInput(&existingSnippet, input)
	if err := models.DB.Save(&existingSnippet).Error; err != nil {
		return handleDatabaseError(err, "Error updating snippet")
	}
	// Preload User data
	if err := models.DB.Preload("User").First(&existingSnippet, existingSnippet.ID).Error; err != nil {
		return handleDatabaseError(err, "Error fetching snippet with user data")
	}

	return c.JSON(fiber.Map{"success": true, "snippet": existingSnippet})
}

func (sc *SnippetController) DeleteSnippet(c *fiber.Ctx) error {
	// Delete a snippet
	id := c.Params("id")
	userID := extractUserID(c)

	snippet, err := fetchSingleSnippet(id)
	if err != nil {
		return err
	}

	if snippet.UserID != userID {
		return middleware.NewError(fiber.StatusForbidden, "You don't have permission to delete this snippet")
	}

	if err := models.DB.Delete(&snippet).Error; err != nil {
		return handleDatabaseError(err, "Error deleting snippet")
	}
	return c.JSON(fiber.Map{"success": true, "message": "Snippet deleted successfully"})
}

func (sc *SnippetController) GetLanguages(c *fiber.Ctx) error {
	// Retrieve all languages
	var languages []models.Language
	if err := models.DB.Find(&languages).Error; err != nil {
		return handleDatabaseError(err, "Error fetching languages")
	}
	return c.JSON(fiber.Map{"success": true, "languages": languages})
}

// Helper functions

func fetchSnippets(query *gorm.DB) ([]models.Snippet, error) {
	// Fetch a list of snippets
	var snippets []models.Snippet
	err := query.Find(&snippets).Error
	return snippets, err
}

func fetchSingleSnippet(id string) (models.Snippet, error) {
	// Fetch a single snippet by ID
	var snippet models.Snippet
	err := models.DB.Preload("User").First(&snippet, id).Error
	if err == gorm.ErrRecordNotFound {
		return snippet, middleware.NewError(fiber.StatusNotFound, "Snippet not found")
	}
	return snippet, err
}

func extractUserID(c *fiber.Ctx) uint {
	// Extract the authenticated user ID from the context
	return c.Locals("userId").(uint)
}

func isAuthorized(c *fiber.Ctx, snippetUserID uint) bool {
	// Check if the current user is authorized to access the snippet
	userID, ok := c.Locals("userId").(uint)
	return ok && snippetUserID == userID
}

func validateUser(userID uint) error {
	// Validate if the user exists in the database
	var user models.User
	if err := models.DB.First(&user, userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return middleware.NewError(fiber.StatusBadRequest, "Invalid user ID")
		}
		return handleDatabaseError(err, "Error checking user existence")
	}
	return nil
}

func parseSnippetInput(c *fiber.Ctx) (models.SnippetInput, error) {
	// Parse snippet input from the request body
	var input models.SnippetInput
	if err := c.BodyParser(&input); err != nil {
		return input, middleware.NewError(fiber.StatusBadRequest, "Invalid input")
	}
	return input, nil
}

func createSnippetFromInput(input models.SnippetInput, userID uint) models.Snippet {
	// Create a Snippet object from the input and user ID
	return models.Snippet{
		Name:        input.Name,
		Description: input.Description,
		Code:        input.Code,
		Language:    input.Language,
		Tags:        input.Tags,
		Visibility:  input.Visibility,
		UserID:      userID,
	}
}

func updateSnippetFromInput(snippet *models.Snippet, input models.SnippetInput) {
	// Update the snippet fields based on the input
	snippet.Name = input.Name
	snippet.Description = input.Description
	snippet.Code = input.Code
	snippet.Language = input.Language
	snippet.Tags = input.Tags
	snippet.Visibility = input.Visibility
}

func handleDatabaseError(err error, message string) error {
	// Return a generic error message for database errors
	return middleware.NewError(fiber.StatusInternalServerError, message)
}
