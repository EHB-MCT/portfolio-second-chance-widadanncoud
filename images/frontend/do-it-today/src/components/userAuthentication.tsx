import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { backendService } from "../services/backendService";

function UserAuthentication() {
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
                    } 
                })
            
        }
    }, [location]);
    
    
    return <></>
}

export default UserAuthentication;