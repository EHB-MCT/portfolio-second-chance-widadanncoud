import { useState } from 'react';
import styles from './updateProfileModal.module.css';
import { backendService } from '../../../services/backendService';

function UpdateProfileModal({type, setModalIsVisible}: {type: string, setModalIsVisible: Function}) {
    const [currentPassword, setCurrentPassword] = useState<string|undefined>(undefined)
    const [newValue, setNewValue] = useState<string|undefined>(undefined)
    const [confirmNewValue, setConfirmNewValue] = useState<string|undefined>(undefined)


    const submitUpdate = async (event:React.FormEvent) => {
        event.preventDefault();
        //check if all the fields are filled
        if (currentPassword && newValue && confirmNewValue) {
            //check if the current password is correct
            if (currentPassword === localStorage.getItem("password")) {
                //check if filled in values match
                if (newValue === confirmNewValue) {
                    //call the backend service to update the user data
                    const email = localStorage.getItem("email") || ""
                    const response = await backendService.updateUserData(email, currentPassword, newValue, type)
                    //if the response is success, reload the page
                    if (response === "success") {
                        localStorage.setItem(type, newValue)
                        window.location.reload()
                    //if the response is not success, log the error
                    } else {
                        console.log(response)
                    }
                } 
            //if the current password is incorrect, clear the local storage and reload the page
            } else { 
                localStorage.clear()
                window.location.reload()
            }
        }
    }

    return ( 
        <div className={styles.outerModalContainer}>
            <form className={styles.formContainer} onSubmit={submitUpdate}>
                <label htmlFor="password" className={styles.label}>current password</label>
                <input type="password" name="password" id="password" className={styles.input} placeholder=' please enter current password'
                onChange={(event) => setCurrentPassword(event.target.value)} required/>


                <label htmlFor="newValue" className={styles.label}>new {type}</label>
                <input type={type} name="newValue" id="newValue" className={styles.input} placeholder={` please enter new ${type}`}
                onChange={(event) => setNewValue(event.target.value)}  required/>


                <label htmlFor="confirmNewValue" className={styles.label}>confirm new {type}</label>
                <input type={type} name="confirmNewValue" id="confirmNewValue" className={styles.input} placeholder={` please confirm new ${type}`}
                onChange={(event) => setConfirmNewValue(event.target.value)}  required/>


                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={() => {setModalIsVisible(false)}}>Cancel</button>
                    <button className={styles.updateButton} type='submit'>Update</button>
                </div>
                
            </form>
        </div>
     );
}

export default UpdateProfileModal;