package models

import (
	"gorm.io/gorm"
)

type Language struct {
	gorm.Model
	Name string `json:"name" gorm:"unique;not null"`
}
