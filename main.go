package main

import (
	//"net/http"
	//"strconv"
	"level11DB"
	"level11api"
	"net/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	level11DB.ConnDB()
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// set Permission
	//e.Static("/static", "assets")
	// Routes

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	e.POST("/users", level11api.CreateUser)
	e.GET("/users", level11api.GetUsers)
	e.GET("/users/:id", level11api.GetUsersById)
	e.PUT("/users/:id", level11api.UpdateUser)
	e.DELETE("/users/:id", level11api.DeleteUser)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
