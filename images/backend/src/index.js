import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { databaseService } from "./services/databaseService.js"
import e from "express"

const app = express()
app.use(cors())
app.use(express.static('./src/docs'))
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
    //check if all information is provided
    if (request.body.firstName && request.body.lastName && request.body.email && request.body.password) {
        try {
            const existingUserResult = await databaseService.getUser(request.body.email)
            //check if user already exists
            if (existingUserResult) {
                //return error message if user already exists
                response.status(400).send({
                    status: 400,
                    message: 'User already exists'
                })

            } else {
                const newUser = {
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    password: request.body.password
                }
                //add user to database
                await databaseService.addUser(newUser)
                response.status(200).send({
                    status: 200,
                    message: "User succesfully created"
                })
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message to frontend
            response.status(400).send({
                status: 400,
                message: error.message
            })
        }
    } else {
        //return error message if missing information
        response.status(401).send({
            status: 401,
            message: 'Missing information'
        })

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
                    response.status(200).send({
                        status: 200,
                        message: "User succesfully logged in"
                    })
                } else {
                    response.status(401).send({
                        status: 401,
                        message: "incorrect credentials"
                    })
                }
            } else {
                response.status(401).send({
                    status: 401,
                    message: "incorrect credentials"
                })
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(401).send({
                status: 401,
                message: error.message
            })
        }
    } else {
        response.status(401).send({
            status: 401,
            message: 'incorrect credentials'
        })
    }
})


/** POST endpoint, get user data based on email
 * 
 * @param {object} userCredentials - user email and password
 * @returns {object} user - user data
 */
app.post('/getUserData', async (request, response) => {
    //check if email and password are provided
    if (request.body.email && request.body.password) {
        try {
            const email = request.body.email;
            // Assuming you have a function called getUserDataByEmail in your databaseService to fetch user data based on email
            const userData = await databaseService.getUser(email);
            //check if user exists and if password is correct
            //if user does not exist, return error message
            if (!userData) {
                return response.status(404).json({
                    status: 404,
                    message: "User data not found"
                });
            }
            //if password is incorrect, return error message
            if (userData.password !== request.body.password) {
                return response.status(401).json({
                    status: 401,
                    message: "Incorrect password"
                });
            } else {
                //if user exists and password is correct, return user data
                return response.status(200).json({
                    status: 200,
                    data: userData
                });
            }


        } catch (error) {
            // Handle the error here
            console.error(error);
            return response.status(500).json({
                status: 500, error:
                    "Internal server error"
            });
        }
    } else {
        //return error message if missing information
        return response.status(400).json({
            status: 400,
            error: "Missing information"
        });
    }

});

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
                    response.status(200).send({
                        status: 200,
                        message: "user succesfully updated"
                    })
                } else {

                    response.status(401).send({
                        status: 401,
                        message: "incorrect password"
                    })
                }
            } else {
                response.status(401).send({
                    status: 401,
                    message: "incorrect credentials"
                })
            }
        } catch (error) {
            // Handle the error here
            console.log(error);
            //send error back
            response.status(400).send({
                status: 400,
                message: error
            })
        }
    } else {
        response.status(400).send({
            status: 400,
            message: "missing information"
        })
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
            console.log(userCredentials);
            //get user from database
            let user = await databaseService.getUser(userCredentials.email)
            console.log(user);
            //check if user exists and if password is correct
            if (user) {
                if (user.password === userCredentials.password) {
                    //delete user from database
                    await databaseService.deleteUser(userCredentials.email)
                    response.status(200).send({
                        status: 200,
                        message: "User succesfully deleted"
                    })
                } else {
                    response.status(401).send({
                        status: 401,
                        message: "incorrect credentials"
                    })
                    console.log("log1");
                }
            } else {
                response.status(401).send({
                    status: 401,
                    message: "incorrect credentials"
                })
                console.log("log2");
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(400).send(error.message)
        }
    } else {
        response.status(401).send({
            status: 401,
            message: "incorrect credentials"
        })
    }
})

/**POST endpoint, create new task 
 * 
 * @param {object} userCredentials, newTask - user credentials and new task
*/
app.post('/createTask', async (request, response) => {
    //check if email and password are provided
    if (request.body.email && request.body.password) {
        try {
            //get user from database
            const result = await databaseService.getUser(request.body.email)
            //check if user exists and if password is correct
            if (result) {
                //check if user exists and if password is correct
                if (result.password === request.body.password) {
                    //create new task
                    await databaseService.createTask(result.id, request.body.newTask)
                    response.status(200).send({
                        status: 200,
                        message: "task succesfully created"
                    })
                } else {
                    //return error message if password is incorrect
                    response.status(401).send({
                        status: 401,
                        message: "incorrect credentials"
                    })
                }
            } else {
                //return error message if user does not exist
                response.status(401).send({
                    status: 401,
                    message: "incorrect credentials"
                })
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(400).send(error.message)
        }
        
            
    } else {
        response.status(401).send({
            status: 401,
            message: "incorrect credentials"
        })
    }
})



/**POST endpoint, get user tasks from database
 * 
 * @param {object} userCredentials - user credentials
 * @returns {object} - user tasks
*/
app.post('/getTasks', async (request, response) => {
    //check if email and password are provided
    if (request.body.email && request.body.password) {
        try {
            //get user from database
            const result = await databaseService.getUser(request.body.email)
            //check if user exists and if password is correct
            if (result) {
                //check if user exists and if password is correct
                if (result.password === request.body.password) {
                    //get tasks from database
                    const tasks = await databaseService.getTasks(result.id)
                    response.status(200).send({
                        status: 200,
                        tasks: tasks
                    })
                } else {
                    //return error message if password is incorrect
                    response.status(401).send({
                        status: 401,
                        message: "incorrect credentials"
                    })
                }
            } else {
                //return error message if user does not exist
                response.status(401).send({
                    status: 401,
                    message: "incorrect credentials"
                })
            }
        } catch (error) {
            //show error in console
            console.log(error);
            //send error message in response
            response.status(400).send(error.message)
        }
        
            
    } else {
        response.status(401).send({
            status: 401,
            message: "incorrect credentials"
        })
    }
})