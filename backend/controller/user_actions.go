package controller

import (
	"encoding/json"
	"go-chat/database"
	"go-chat/model"
	"net/http"
)

/**

  content: string,
  author: string,
  creationDate: string
*/

type Post struct {
	Content      string `json:"content"`
	Author       string `json:"author"`
	CreationDate string `json:"creationDate"`
}

func CreatePostHandler(w http.ResponseWriter, r *http.Request) {

	var post Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, "could not obtain post contents", http.StatusBadRequest)
		return
	}

	cookies, err := r.Cookie("jwt")
	if err != nil {
		http.Error(w, "could not obtain jwt token from cookies", http.StatusUnauthorized)
		return
	}

	user, err := getUserFromJWT(cookies.Value)
	if err != nil {
		http.Error(w, "could not parse email from jwt", http.StatusUnauthorized)
		return
	}

	// database.DB.Find(user)
	var foundUser model.User
	err = database.DB.Where("username = ?", user.Username).First(&foundUser).Error
	if err != nil {
		http.Error(w, "could not find user in the database", http.StatusNotFound)
		return
	}

	postDB := &model.Post{
		// Model: ,
		Content: post.Content,
		UserID:  foundUser.ID,
	}

	err = database.DB.Create(&postDB).Error
	if err != nil {
		http.Error(w, "could not create post", http.StatusInternalServerError)
		return
	}

	// json.NewEncoder()
	w.Write([]byte("Post creation successful"))
}

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {

	allPosts := []model.Post{}

	err := database.DB.Preload("User").Find(&allPosts).Error
	if err != nil {
		http.Error(w, "could not find posts", http.StatusInternalServerError)
		return
	}

	var userPosts []Post

	for _, p := range allPosts {
		userPost := Post{
			Content: p.Content,
			// CreationDate: p.,
			Author:       p.User.Username,
			CreationDate: p.CreatedAt.Format("2006-01-02"),
		}

		userPosts = append(userPosts, userPost)
	}

	json.NewEncoder(w).Encode(userPosts)

}
