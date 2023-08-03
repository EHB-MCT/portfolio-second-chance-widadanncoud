const request = require('supertest');
const app = "localhost:3000"

beforeAll(async () => {
    // Create a new user
    const newUser ={ 
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
    };
    await request(app)
            .post('/createUser')
            .send(newUser);
});

afterAll(async () => {
    // Delete the user
    const user = {
        email: "john.doe@example.com",
        password: "password123"
    }
    
    await request(app)
            .delete('/deleteUser')
            .send(user);
})

describe('POST endpoint "/createTask"', () => {
    it('should create a new task for the user', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'password123';
        const newTask = 'Buy fruits and vegetables for the week'

        // Make a request to the endpoint
        const response = await request(app)
            .post('/createTask')
            .send({ email: userEmail, password: userPassword, newTask });

        // Expectations
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(200);
    });


    it('should return a status code of 401 if email is incorrect', async () => {
        const userEmail = 'fake@example.com';
        const userPassword = 'password123';
        const newTask = 'Buy fruits and vegetables for the week'

        // Make a request to the endpoint
        const response = await request(app)
            .post('/createTask')
            .send({ email: userEmail, password: userPassword, newTask });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });

    it('should return a status code of 401 if password is incorrect', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'wrongpassword';
        const newTask = 'Buy fruits and vegetables for the week'

        // Make a request to the endpoint
        const response = await request(app)
            .post('/createTask')
            .send({ email: userEmail, password: userPassword, newTask });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });

});

describe('POST endpoint "/getTasks"', () => {
    it('should get tasks for a user based on the provided email and password', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'password123';

        // Make a request to the endpoint
        const response = await request(app)
            .post('/getTasks')
            .send({ email: userEmail, password: userPassword });

        // Expectations
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(200);
    });

    it('should return a status code of 401 if the user does not exist', async () => {
        const userEmail = 'nonexistent@example.com';
        const userPassword = 'password123';

        // Make a request to the endpoint
        const response = await request(app)
            .post('/getTasks')
            .send({ email: userEmail, password: userPassword });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });

    it('should return a status code of 401 if the password is incorrect', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'wrongpassword';

        // Make a request to the endpoint
        const response = await request(app)
            .post('/getTasks')
            .send({ email: userEmail, password: userPassword });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });

    it('should return a status code of 401 if email or password are missing', async () => {
        // Make a request to the endpoint without providing the email and password parameters
        const response = await request(app).post('/getTasks');

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });
});


describe('PUT endpoint "/updateTask"', () => {
    it('should update an existing task for the user', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'password123';
        const currentTask= 'Buy fruits and vegetables for the week'
        const newTask = 'Updated task description'

        // Make a request to the endpoint
        const response = await request(app)
            .put(`/updateTask`)
            .send({ email: userEmail, password: userPassword, currentTask, newTask });

        // Expectations
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(200);
    });


    it('should return a status code of 401 if the user does not exist', async () => {
        const userEmail = 'fake@example.com';
        const userPassword = 'password123';
        const currentTask = 'Updated task description'
        const newTask = 'Buy fruits and vegetables for the week'

        // Make a request to the endpoint
        const response = await request(app)
            .put(`/updateTask`)
            .send({ email: userEmail, password: userPassword, currentTask, newTask });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    });

    it('should return a status code of 401 if the password is incorrect', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'wrongpassword';
        const currentTask = 'Buy fruits and vegetables for the week'
        const newTask = 'Updated task description'

        // Make a request to the endpoint
        const response = await request(app)
            .put(`/updateTask`)
            .send({ email: userEmail, password: userPassword, currentTask, newTask });


        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    })

    it('should return a status code of 400 if email or password are missing', async () => {
        const newTask = 'Buy fruits and vegetables for the week'
        const currentTask = 'Updated task description'

        // Make a request to the endpoint without providing the email and password parameters
        const response = await request(app)
            .put('/updateTask')
            .send({ currentTask, newTask });

        // Expectations
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(400);
    })

});

describe('DELETE endpoint "/deleteTask"', () => {
    it('should delete an existing task for the user', async () => {
        const userEmail = 'john.doe@example.com';
        const userPassword = 'password123';
        const taskIdToDelete = '1'; // Replace with the ID of the task to delete

        // Make a request to the endpoint
        const response = await request(app)
            .delete(`/deleteTask/${taskIdToDelete}`)
            .send({ email: userEmail, password: userPassword });

        // Expectations
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(200);
    });

    it('should return a status code of 401 if the user does not exist', async () => {
        const userEmail = 'fake@example.com';
        const userPassword = 'password123';
        const taskIdToDelete = '1'; 

        // Make a request to the endpoint
        const response = await request(app)
            .delete(`/deleteTask/${taskIdToDelete}`)
            .send({ email: userEmail, password: userPassword });

        // Expectations
        expect(response.status).toBe(401);
        expect(response.body.status).toBe(401);
    })

});
