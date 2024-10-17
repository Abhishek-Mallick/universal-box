package models

import (
	"time"

	"gorm.io/gorm"
)

type Snippet struct {
	ID          uint           `gorm:"primarykey" json:"id"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	Name        string         `json:"name" gorm:"not null"`
	Description string         `json:"description"`
	Code        string         `json:"code" gorm:"not null"`
	Language    string         `json:"language" gorm:"not null"`
	Tags        string         `json:"tags"`
	Visibility  bool           `json:"visibility" gorm:"not null;default:true"`
	UserID      uint           `json:"userId" gorm:"not null"`
	User        User           `json:"user" gorm:"foreignKey:UserID"`
}

type SnippetInput struct {
	// Struct used for creating/updating snippets
	Name        string `json:"name"`
	Description string `json:"description"`
	Code        string `json:"code"`
	Language    string `json:"language"`
	Tags        string `json:"tags"`
	Visibility  bool   `json:"visibility"`
}
