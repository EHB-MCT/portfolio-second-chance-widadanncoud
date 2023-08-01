import { Link } from 'react-router-dom';
import styles from './registerPage.module.css';
import { useState } from 'react';

function RegisterPage() {
    const [email, setEmail] = useState<string|undefined>(undefined);
    const [password, setpassword] = useState<string|undefined>(undefined);
    const [firstName, setFirstName] = useState<string|undefined>(undefined);
    const [lastName, setLastName] = useState<string|undefined>(undefined);

    const submitNewAccount = async (event:React.FormEvent) => {
        event.preventDefault();
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