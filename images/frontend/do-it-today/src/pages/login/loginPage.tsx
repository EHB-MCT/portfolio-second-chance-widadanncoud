import { Link } from "react-router-dom";
import styles from "./loginPage.module.css"  
import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState<string|undefined>(undefined);
    const [password, setpassword] = useState<string|undefined>(undefined);

    const submitLogin = (event:React.FormEvent) => {
        event.preventDefault();
        if (email && password ) {
            //TO DO: send login request to server
            console.log("executing login request");
        }
    }


    return ( 
    <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={submitLogin}>
            <h1>Log In</h1>
            <div className={styles.inputContainer}>
                <input type="email" placeholder="email" onBlur={(event) => setEmail(event.target.value)} required/>
                <input type="password" name="" id="" placeholder="Password" onBlur={(event) => setpassword(event.target.value)} required/>
            </div>
            <div className={styles.buttonContainer}>
                <input type="submit" value="Log In"/>
                <span>Don't have an account yet? <Link to={"#"}>Sign up now!</Link></span>
            </div>
        </form>
    </div>
    );
}

export default LoginPage;