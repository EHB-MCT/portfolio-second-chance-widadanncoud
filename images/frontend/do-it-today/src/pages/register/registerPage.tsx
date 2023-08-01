import { Link } from 'react-router-dom';
import styles from './registerPage.module.css';
import { useState } from 'react';
import { backendService } from '../../services/backendService';

function RegisterPage() {
    const [email, setEmail] = useState<string|undefined>(undefined);
    const [password, setpassword] = useState<string|undefined>(undefined);
    const [firstName, setFirstName] = useState<string|undefined>(undefined);
    const [lastName, setLastName] = useState<string|undefined>(undefined);

    const submitNewAccount = async (event:React.FormEvent) => {
        // prevent the default behaviour of the form to refresh the page
        event.preventDefault();
        // check if the email and password are defined
        if (email && password && firstName && lastName) {
            // call the backend service to try create new user
            const response = await backendService.createAccount(email, password, firstName, lastName)
            // if the response is success, redirect to the home page
            if (response === "success") {
                console.log(response);
                window.location.assign("/");
            // if the response is not success, log the error
            } else {
                console.log(response);
            }
            
          
        }
    }

    return ( 
    <div className={styles.FormContainer}>
        <form className={styles.Form} onSubmit={submitNewAccount}>
            <h1>Create account</h1>
            <div className={styles.inputContainer}>

                <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={(event) => setFirstName(event.target.value)} required/>
                <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={(event) => setLastName(event.target.value)} required/>
                <input type="email" placeholder="email" onChange={(event) => setEmail(event.target.value)} required/>
                <input type="password" name="password" id="password" placeholder="Password" onChange={(event) => setpassword(event.target.value)} required/>
                
            </div>
            <div className={styles.buttonContainer}>
                <input type="submit" value="create account"/>
                <span>already have an account?  <Link className={styles.link} to={"/user/login"}>Login</Link></span>
            </div>
        </form>
    </div>
    );
}

export default RegisterPage;