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
            
            if (existingUserResult) {
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


/**POST endpoint, check user credentials 
 * 
 * @param {object} userCredentials  - user credentials
 * @returns {string} - a message saying the user was logged in or an error message
 */
app.post('/login', async (request, response) => {
    //check if email and password are provided
    if (request.body.email && request.body.password) {
        try {
            const userCredentials = {
                email: request.body.email,
                password: request.body.password,
                newEmail: request.body.newEmail | 0,
                newPassword: request.body.newPassword | 0
            }
            //get user from database
            const user = await databaseService.getUser(userCredentials.email)
            //check if user exists and if password is correct
            if (user) {
                if (user.password === userCredentials.password) {
                    response.status(200).send("User succesfully logged in")
                } else {
                    response.status(400).send("incorrect credentials")
                }
            } else {
                response.status(400).send("incorrect credentials")
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(400).send(error.message)
        }
    } else {
        response.status(400).send('incorrect credentials')
    }
})

/**PUT endpoint, update user credentials 
 * 
 * @param {object} updatedUser - updated user credentials
 * @returns {string} - a message saying the user was updated or an error message
*/
app.put('/updateUser', async (request, response) => {
   //get updated user credentials from request body
   if (request.body.currentEmail && request.body.currentPassword) {
    let updatedUser = {
        currentEmail: request.body.currentEmail,
        currentPassword: request.body.currentPassword,
        newEmail: request.body.newEmail,
        newPassword: request.body.newPassword
    }

    try {
        let userCurrentCredentials = await databaseService.getUser(updatedUser.currentEmail)
        //retrieve user from database
        if (userCurrentCredentials) {
            //check if current password is correct
            if (userCurrentCredentials.password === updatedUser.currentPassword) {
                //check if new email is not empty
                databaseService.updateUser(updatedUser)
                response.status(200).send("message: user succesfully updated")
            } else{
                
                response.status(401).send("error: incorrect password")
            }
        } else{
            response.status(404).send("error: incorrect credentials")
        }
    } catch (error) {
        // Handle the error here
        console.log(error);
        //send error back
        response.status(400).send(`error: ${error}` )
    }
   } else{
         response.status(400).send("error: missing information")
   }
    
})

/**DELETE endpoint, delete user from database
 * 
 * @param {object} userCredentials - user credentials
 * @returns {string} - a message saying the user was deleted or an error message
*/
app.delete('/deleteUser', async (request, response) => {
    //get user credentials from request body
    if (request.body.email && request.body.password) {
        try {
            let userCredentials = {
                email: request.body.email,
                password: request.body.password
            }
            //get user from database
            let user = await databaseService.getUser(userCredentials.email)
            //check if user exists and if password is correct
            if (user) {
                if (user.password === userCredentials.password) {
                    //delete user from database
                    await databaseService.deleteUser(userCredentials.email)
                    response.status(200).send("User succesfully deleted")
                } else {
                    response.status(400).send("incorrect credentials")
                }
            } else {
                response.status(400).send("incorrect credentials")
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(400).send(error.message)
        }
    } else {
        response.status(400).send('incorrect credentials')
    }
})
