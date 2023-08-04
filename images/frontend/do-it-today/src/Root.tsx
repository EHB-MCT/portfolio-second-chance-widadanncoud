import {Outlet} from "react-router-dom"
import Navbar from "./components/navbar";

function Root() {

    return ( 
        <div>
            <Navbar/>
            <Outlet/> 
        </div>
     );
}

export default Root;