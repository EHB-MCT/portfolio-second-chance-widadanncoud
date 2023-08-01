const request = require('supertest');
const app = require('../index.js');

describe('GET endpoint "/"', () => {
  it('should return a status code of 200 and redirect to index.html', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.redirect).toBe(true);
    expect(response.headers.location).toBe('./index.html');
  });
});

describe('POST endpoint "/createUser"', () => {
  it('should create a new user and return a status code of 200', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const response = await request(app).post('/createUser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "User succesfully created"
    });
  });

  it('should return a status code of 400 if required information is missing', async () => {
    const invalidUser = {
      firstName: 'John',
      lastName: 'Doe',
      // Missing email and password
    };
    const response = await request(app).post('/createUser').send(invalidUser);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'Missing information'
    });
  });
});

describe('POST endpoint "/login"', () => {
  it('should log in the user and return a status code of 200', async () => {
    const userCredentials = {
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const response = await request(app).post('/login').send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "User succesfully logged in"
    });
  });

  it('should return a status code of 400 if email and/or password are missing', async () => {
    const invalidCredentials = {
      email: 'john.doe@example.com',
      // Missing password
    };
    const response = await request(app).post('/login').send(invalidCredentials);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'incorrect credentials'
    });
  });

  it('should return a status code of 400 if the user does not exist', async () => {
    const invalidUser = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };
    const response = await request(app).post('/login').send(invalidUser);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'incorrect credentials'
    });
  });

  it('should return a status code of 400 if the password is incorrect', async () => {
    const invalidCredentials = {
      email: 'john.doe@example.com',
      password: 'wrongpassword',
    };
    const response = await request(app).post('/login').send(invalidCredentials);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: 'incorrect credentials'
    });
  });
});

describe('PUT endpoint "/updateUser"', () => {
  it('should update the user credentials and return a status code of 200', async () => {
    const updatedUser = {
      currentEmail: 'john.doe@example.com',
      currentPassword: 'password123',
      newEmail: 'john.smith@example.com',
      newPassword: 'newpassword456',
    };
    const response = await request(app).put('/updateUser').send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "user succesfully updated"
    });
  });

  it('should return a status code of 400 if required information is missing', async () => {
    const invalidUser = {
      currentEmail: 'john.doe@example.com',
      currentPassword: 'password123',
      // Missing newEmail and newPassword
    };
    const response = await request(app).put('/updateUser').send(invalidUser);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "missing information"
    });
  });

  it('should return a status code of 401 if the current password is incorrect', async () => {
    const invalidUser = {
      currentEmail: 'john.doe@example.com',
      currentPassword: 'wrongpassword',
      newEmail: 'john.smith@example.com',
      newPassword: 'newpassword456',
    };
    const response = await request(app).put('/updateUser').send(invalidUser);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: 401,
      message: "incorrect password"
    });
  });

  it('should return a status code of 404 if the user does not exist', async () => {
    const invalidUser = {
      currentEmail: 'nonexistent@example.com',
      currentPassword: 'password123',
      newEmail: 'john.smith@example.com',
      newPassword: 'newpassword456',
    };
    const response = await request(app).put('/updateUser').send(invalidUser);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: "incorrect credentials"
    });
  });
});

describe('DELETE endpoint "/deleteUser"', () => {
  it('should delete the user and return a status code of 200', async () => {
    const userCredentials = {
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const response = await request(app).delete('/deleteUser').send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 200,
      message: "User succesfully deleted"
    });
  });

  it('should return a status code of 400 if email and/or password are missing', async () => {
    const invalidCredentials = {
      email: 'john.doe@example.com',
      // Missing password
    };
    const response = await request(app).delete('/deleteUser').send(invalidCredentials);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: "incorrect credentials"
    });
  });

  it('should return a status code of 400 if the user does not exist', async () => {
    const invalidUser = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };
    const response = await request(app).delete('/deleteUser').send(invalidUser);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: "incorrect credentials"
    });
  });

  it('should return a status code of 400 if the password is incorrect', async () => {
    const invalidCredentials = {
      email: 'john.doe@example.com',
      password: 'wrongpassword',
    };
    const response = await request(app).delete('/deleteUser').send(invalidCredentials);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: "incorrect credentials"
    });
  });

  describe('GET endpoint "/getUserData"', () => {
    it('should get user data based on the provided email', async () => {
        const userEmail = 'john.doe@example.com';

        // Make a request to the endpoint
        const response = await request(app).get(`/getUserData?email=${userEmail}`);

        // Expectations
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
        status: 200,
        data: expect.any(Object), // You can customize this based on the expected data structure
        });
    });

    it('should return a status code of 404 if the user does not exist', async () => {
        const userEmail = 'nonexistent@example.com';

        // Make a request to the endpoint
        const response = await request(app).get(`/getUserData?email=${userEmail}`);

        // Expectations
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
        status: 404,
        message: 'User not found',
        });
    });

    it('should return a status code of 400 if email parameter is missing', async () => {
        // Make a request to the endpoint without providing the email parameter
        const response = await request(app).get('/getUserData');

        // Expectations
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        status: 400,
        message: 'Email parameter is missing',
        });
    });
    });
});
