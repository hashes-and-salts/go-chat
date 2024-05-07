package database

import "go-chat/model"

func CreatePost(post model.Post) {
	DB.Create(&post)
}

func GetPosts() []model.Post {
	var posts []model.Post
	DB.Find(&posts)
	return posts
}
