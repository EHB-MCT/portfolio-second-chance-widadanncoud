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
                .then(([rows,fields]) => rows[0])
            
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

    async updateUser(updatedUser){
        try {
            // update user in database
            let newUserCredentials = {
                email: updatedUser.currentEmail,
                password: updatedUser.currentPassword
            }
            //if new email or password is given, update it
            if (updatedUser.newEmail) newUserCredentials.email = updatedUser.newEmail  
            if (updatedUser.newPassword) newUserCredentials.password = updatedUser.newPassword
            let result =  await connection.promise().query("UPDATE users Set email = ?, password = ? WHERE email = ?",[newUserCredentials.email, newUserCredentials.password, updatedUser.currentEmail])
            return "user succesfully updated"

        } catch (error) {

            // Handle the error here
            console.error('Error occurred while executing the query:', error);
            // You can return an error object or throw an error if needed
            throw error;
        }
    }

    async deleteUser(userEmail){
        try {
            //delete user from database
            await connection.promise().query(
                'DELETE FROM users WHERE email = ?',[userEmail])
            return "user succesfully deleted"

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

    async createTask(userId, newTask){
        try {
            //add task to database
            await connection.promise().query(
                'INSERT INTO tasks (user_id, task) values (?,?)',
                [userId, newTask])
            return "task succesfully created"

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


    async getTasks(userId){
        try {
            //get all tasks from database
            return await connection.promise().query(
                'SELECT * FROM tasks WHERE user_id like ?',[userId])
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