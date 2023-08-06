import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { backendService } from "../services/backendService";
import styles from "./navBar.module.css";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const location = useLocation().pathname;
    
    
    
    useEffect(() => {
        //retrieve email and password from local storage
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        //if email or password is null, redirect to login page
        if (email === null || password === null) {
            if (location !== "/user/login" && location !== "/user/register") {
                window.location.assign("/user/login");
            }
        } else {
            //check if credentials are valid
            backendService.checkCredentials(email, password)
                .then((response) => {
                    //remove email and password from local storage if credentials are invalid 
                    //and redirect to login page
                    if (response !== "success") {
                        localStorage.removeItem("email");
                        localStorage.removeItem("password");
                        window.location.assign("/user/login");
                    } else{
                        setIsLoggedIn(true);
                        //redirect to home page if user is logged in and tries to access login or register page
                        if (location === "/user/login" || location === "/user/register") {
                            window.location.assign("/");
                        }
                    }
                })
            
        }
    }, [location]);
    
    
    return(
        <div className={styles.navbar}>
            
            {isLoggedIn ? (
                <>
            <Link to="/" className={styles.logo}>
                <img src="/images/logo.png" alt="Do it Today" />
            </Link>
            
            <div className={styles.navLinks}>
                <Link to="/user/profile" >Profile</Link>
                <Link to="/user/logout">Logout</Link>
            </div>
            </>) : (<>
                <img src="/images/logo.png" alt="Do it Today"  className={styles.logo}/>
            </>)}
        </div>
    )
}

export default Navbar;