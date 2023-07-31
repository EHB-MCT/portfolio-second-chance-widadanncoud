class BackendService {

    async checkCredentials(email: string, password: string): Promise<string> {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password // Include the password in the request body
                })
            });

            const data = await response.json();

            if (data.status === 200) {
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('password', password);
                return data.message;
            } else {                
                return data.error;
            }
        } catch (error) {
            // Handle any errors that occur during the fetch or JSON parsing process
            console.error("An error occurred:", error);
            return "error";
        }
    }
}

export const backendService = new BackendService();

