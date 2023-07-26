import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { databaseService } from "./services/databaseService.js"

const app = express()
app.use(cors())
app.use(express.static('./app/docs'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
const port = 3000 || process.env.PORT

//get a message saying the server is running and on what port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
 
/**
 * object template
 * 
 * @typedef {object} User
 *      @property {string} firstName - first name of the user  
 *      @property {string} lastName - last name of the user
 *      @property {string} email - email of the user
 *      @property {string} password - password of the user
 * 
 * @typedef {object} userCredentials
 *      @property {string} email - email of the user
 *      @property {string} password - password of the user
 * 
 * @typedef {object} updatedUser
 *      @property {string} currentEmail - old email of user
 *      @property {string} newEmail - new email of user
 *      @property {string} currentPassword - old password of user
 *      @property {string} newPassword - new password of user
 */

/**GET endpoint, html page with all endpoints 
 * 
 * @returns {html} html page with all endpoints
*/
app.get('/', (request, response) => {
    response.status(200).redirect('./index.html')
})

/** POST endpoint, create a new user
 * 
 * @param {object} newUser - the new user to be created
 * @returns {string} - a message saying the user was created or an error message 
 */
app.post('/createUser', async (request, response) => {
    if (request.body.firstName && request.body.lastName && request.body.email && request.body.password) {
        try {
            const existingUserResult = await databaseService.getUser(request.body.email)
            
            if (existingUserResult.length) {
                response.status(400).send('User already exists')

            } else {
                const newUser = {
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    password: request.body.password
                }
                await databaseService.addUser(newUser)
                response.status(200).send("User succesfully created")
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message to frontend
            response.status(400).send(error.message)
        }
    } else {
        //return error message if missing information
        response.status(400).send('Missing information')
        
    }
})
