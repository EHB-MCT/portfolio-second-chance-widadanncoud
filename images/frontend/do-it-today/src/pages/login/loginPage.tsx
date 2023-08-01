import { Link } from "react-router-dom";
import styles from "./loginPage.module.css"  
import { useState } from "react";
import {backendService} from "../../services/backendService";


function LoginPage() {
    const [email, setEmail] = useState<string|undefined>(undefined);
    const [password, setpassword] = useState<string|undefined>(undefined);

    const submitLogin = async (event:React.FormEvent) => {
        event.preventDefault();
        if (email && password ) {
            const response = await backendService.checkCredentials(email, password);
            if (response === "success") {
                console.log(response);
                window.location.assign("/");
            } else {
                console.log(response);
            }
        }
    }


    return ( 
    <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={submitLogin}>
            <h1>Log In</h1>
            <div className={styles.inputContainer}>
                <input type="email" placeholder="email" onChange={(event) => setEmail(event.target.value)} required/>
                <input type="password" name="" id="" placeholder="Password" onChange={(event) => setpassword(event.target.value)} required/>
            </div>
            <div className={styles.buttonContainer}>
                <input type="submit" value="Log In"/>
                <span>Don't have an account yet?  <Link className={styles.link} to={"/user/register"}>Sign up now!</Link></span>
            </div>
        </form>
    </div>
    );
}

export default LoginPage;