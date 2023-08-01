class BackendService {
    url = 'http://localhost:3000';

    async checkCredentials(email: string, password: string): Promise<string> {
        try {
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
}

export const backendService = new BackendService();

