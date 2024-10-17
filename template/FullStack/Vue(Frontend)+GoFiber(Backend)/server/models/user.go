package models

import (
	"errors"
	"regexp"
	"time"

	"gorm.io/gorm"
)

type User struct {
	// User fields
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"` // Soft delete field
	Username  string         `gorm:"uniqueIndex;not null" json:"username"`
	Email     string         `gorm:"uniqueIndex;not null" json:"emailid"`
	Password  string         `gorm:"not null" json:"-"`                           // Exclude password from JSON
	Snippets  []Snippet      `gorm:"foreignKey:UserID" json:"snippets,omitempty"` // Relationship to Snippets
}

func (u *User) Validate() error {
	// Validate mandatory fields and email format
	if u.Username == "" {
		return errors.New("username is required")
	}
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.Password == "" {
		return errors.New("password is required")
	}
	if !isValidEmail(u.Email) {
		return errors.New("invalid email format")
	}
	return nil
}

func isValidEmail(email string) bool {
	// Basic email format validation
	emailRegex := regexp.MustCompile(`\S+@\S+\.\S+`)
	return emailRegex.MatchString(email)
}
