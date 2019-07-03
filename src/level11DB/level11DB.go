package level11DB

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5433
	user     = "postgres"
	password = "4234dong"
	dbname   = "programming"
)

type User struct {
	ID    int    `json: "id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
type SqlHandler struct {
	Conn *sql.DB
}

var sqliteHandler = new(SqlHandler)

func Execute(params map[interface{}]interface{}) {

	sql := params["sql"].(string)
	fmt.Println(sql)
	result, err := sqliteHandler.Conn.Exec(sql)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(result)
}
func Query(params map[interface{}]interface{}) []User {
	sql := params["sql"].(string)
	fmt.Println(sql)
	var users []User
	rows, err := sqliteHandler.Conn.Query(sql)
	defer rows.Close()
	for rows.Next() {
		var (
			id    int
			name  string
			email string
		)
		err := rows.Scan(&id, &name, &email)
		if err != nil {
			log.Fatal(err)
		}
		var user User
		user.ID = id
		user.Name = name
		user.Email = email
		users = append(users, user)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return users
}
func ConnDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected! DB")

	sqliteHandler.Conn = db

	// ตรงนี้ยัง เรียกคำสั่งนี้ไม่ได้เพราะไม่งั้น database มันจะปิด ต้องไปหาทางเรียกคำสั่งนี้ที่อื่น
	//defer db.Close()

}
