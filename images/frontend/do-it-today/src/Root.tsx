import {Outlet} from "react-router-dom"
import UserAuthentication from "./components/userAuthentication";

function Root() {

    return ( 
        <div>
            <UserAuthentication/>
            <Outlet/> 
        </div>
     );
}

export default Root;