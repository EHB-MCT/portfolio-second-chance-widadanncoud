import { IUser } from "../types/IUser";

interface ITask {
    id: number;
    description: string;
    user_id: number;
}

class BackendService {
    url = process.env.BACKEND || 'http://localhost:3000';

    async checkCredentials(email: string, password: string): Promise<string> {
        console.log(this.url);
        
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password 
                })
            }).then(response => response.json());


            if (response.status === 200) {
                // Store the email and password in localStorage
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }


    async createAccount(email: string, password: string, firstName:string, lastName:string): Promise<string> {
        try {
            // send new user data to backend to be proccesed
            const response = await fetch(`${this.url}/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName 
                })
            }).then(response => response.json());


            if (response.status === 200) {
                // Store the email and password in localStorage
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }

    async getUserData(email: string, password: string): Promise<IUser | undefined> {
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/getUserData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password 
                })
            }).then(response => response.json());

            if (response.status === 200) {
                // Return message
                console.log(response);
                const userData = {
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    password: response.data.password
                }
                return userData;
            } 
        
        }catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
        }
    }

    async updateUserData(email: string, password: string, value:string, type:string): Promise<string> {
        try {
            let data;
            // change variables inside data object depending on what is being updated
            if (type === "password") {
                data = {
                    currentEmail: email,
                    currentPassword: password,
                    newPassword: value

                }
            } else if (type === "email") {
                data = {
                    currentEmail: email,
                    currentPassword: password,
                    newEmail: value
                }
            }
            
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...data})
            }).then(response => response.json());
            console.log(response);
            
            if (response.status === 200) {
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }
    
   async  getTasks(email: string, password: string): Promise<string[] | undefined> {
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/getTasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(response => response.json());

            if (response.status === 200) {
                // Return tasks array 
                const tasks = response.tasks.map((task: ITask) => task.description)               
                return tasks;
            }

        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
        }
    }

    async addTask(email: string, password: string, task: string): Promise<string> {
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/createTask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    newTask: task
                })
            }).then(response => response.json());

            if (response.status === 200) {
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }

    async updateTask(email: string, password: string, task: string, newTask: string): Promise<string> {
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/updateTask`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    currentTask: task,
                    newTask: newTask
                })
            }).then(response => response.json());

            if (response.status === 200) {
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }

    async deleteTask(email: string, password: string, task: string): Promise<string> {
        try {
            // Make a request to the backend to check the credentials
            const response = await fetch(`${this.url}/deleteTask`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    task: task
                })
            }).then(response => response.json());

            if (response.status === 200) {
                // Return message
                return "success";
            } else {                
                // Return error message
                return response.message;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return `error: ${error}`;
        }
    }
}
export const backendService = new BackendService();