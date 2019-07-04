package level11api

import (
	"fmt"
	"level11DB"
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

//----------
// Handlers
//----------
type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var (
	users = map[int]*User{}
	seq   = 1
)

func CreateUser(c echo.Context) (err error) {
	u := new(User)
	if err = c.Bind(u); err != nil {
		return
	}
	params := make(map[interface{}]interface{})
	params["sql"] = fmt.Sprintf("INSERT INTO users (name,email) VALUES ('%v','%v')", u.Name, u.Email)
	level11DB.Execute(params)

	return c.JSON(http.StatusOK, u)
}
func GetUsers(c echo.Context) (err error) {
	params := make(map[interface{}]interface{})
	params["sql"] = fmt.Sprintf("select id, name, email from users")
	u := level11DB.Query(params)
	return c.JSON(http.StatusOK, u)
}
func GetUsersById(c echo.Context) (err error) {
	params := make(map[interface{}]interface{})
	// query ตาม id จาก params
	id, _ := strconv.Atoi(c.Param("id"))
	params["sql"] = fmt.Sprintf("select id, name, email from users where id = %d", id)
	u := level11DB.Query(params)
	return c.JSON(http.StatusOK, u)
}
func UpdateUser(c echo.Context) (err error) {
	id, _ := strconv.Atoi(c.Param("id"))
	u := new(User)
	if err = c.Bind(u); err != nil {
		return
	}
	params := make(map[interface{}]interface{})
	params["sql"] = fmt.Sprintf("UPDATE users SET name='%v', email='%v' where id = %d", u.Name, u.Email, id)
	level11DB.Execute(params)
	return c.JSON(http.StatusOK, u)
}
func DeleteUser(c echo.Context) (err error) {
	params := make(map[interface{}]interface{})
	id, _ := strconv.Atoi(c.Param("id"))
	params["sql"] = fmt.Sprintf("delete from users where id = %d", id)
	level11DB.Execute(params)
	return c.NoContent(http.StatusNoContent)
}
