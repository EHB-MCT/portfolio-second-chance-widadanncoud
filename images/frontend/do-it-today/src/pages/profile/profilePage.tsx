import { useEffect, useState } from 'react';
import ProfileInfoItem from './components/profileInfoItem';
import styles from './profilePage.module.css';
import { backendService } from '../../services/backendService';

function ProfilePage() {
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    useEffect(() => {
          getUserInfo()
    }, []);

    const getUserInfo = async () => {
        const email = localStorage.getItem("email") 
        const password = localStorage.getItem("password")
        await backendService.getUserData(email!, password!).then(response => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setPassword(response.data.password)
        })      
    }

    return ( 
        <div className={styles.profileContainer}>
            <h1>My profile</h1>
            <h3>Personal Information</h3>
            <div className={styles.profileInfoContainer}>
                <ProfileInfoItem label="First name" type="firstName" value={firstName}/>
                <ProfileInfoItem label="Last name" type="lastName" value={lastName}/>
                <ProfileInfoItem label="Email" type="email" value={email}/>
                <ProfileInfoItem label="Password" type="password" value={password}/>
            </div>
            
        </div>
     );
}

export default ProfilePage;