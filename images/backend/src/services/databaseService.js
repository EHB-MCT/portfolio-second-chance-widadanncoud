import mysql from 'mysql2'

const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE
})

/**
 * object template
 * 
 * @typedef {object} User
 *      @property {string} firstName - first name of the user  
 *      @property {string} lastName - last name of the user
 *      @property {string} email - email of the user
 *      @property {string} password - password of the user
*/

class DatabaseService{

    async addUser(newUser){
        try {
            //check if user already exists
            await connection.promise().query(
            'INSERT INTO users (first_name, last_name, email, password) values (?,?,?,?)',
            [newUser.firstName, newUser.lastName, newUser.email, newUser.password])
            return "user succesfully created"

        } catch (error) {
            let errorMessage={
                    message: error.message,
                    errorCode: 400
                }
                //show error in console
                console.log(errorMessage);
                //return error message
                return errorMessage
        }
    }

    async getUser(userEmail){

        try {
            //check if user exists and return user
            return await connection.promise().query(
                'SELECT * FROM users WHERE email = ?',[userEmail])
                .then(([rows,fields]) => rows)
            
        } catch(error) {
            let errorMessage={
                message: error.message,
                errorCode: 400
            }
            //show error in console
            console.log(errorMessage);
            return errorMessage
        }
    }
}

export const databaseService = new DatabaseService()