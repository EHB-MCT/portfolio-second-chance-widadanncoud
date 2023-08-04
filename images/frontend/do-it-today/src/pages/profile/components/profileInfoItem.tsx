import { useEffect, useState } from 'react';
import styles from './profileInfoItem.module.css';

    
function ProfileInfoItem({ label,type, value}: {label: string,type:string, value: string}) {
    const [inputType, setInputType] = useState<string>("text")
    const [editButtonVisible, setEditButtonVisible] = useState<boolean>(false)

    useEffect(() => {
        if (type === "password") {
            setEditButtonVisible(true)
            setInputType("password")}
        if (type === "email") {
            setEditButtonVisible(true)
            setInputType("email")}
    },[setInputType, type]);


    return ( 
        <div className={styles.profileInfoItem}>
            <div className={styles.inputContainer}>
                <label className={styles.label}>{label}</label>
                <input type={inputType} name={type} id={type} disabled={true} value={value} className={styles.input}/>
            </div>
            {(editButtonVisible ? (
                <button className={styles.editButton}>Edit</button>
            ) : (
                <></>
            ))}
        </div>
     );
}

export default ProfileInfoItem;