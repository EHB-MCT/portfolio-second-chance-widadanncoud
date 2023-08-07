import { useState } from 'react';
import styles from './addTaskForm.module.css';
import { backendService } from '../../../services/backendService';

function AddTaskForm() {
    const [newtask, setNewTask] = useState<string|undefined>(undefined);


    const addTask = (event: any) => {
        event.preventDefault();
        if ( newtask) {
            // retrieve email and password from local storage
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            // add task to backend
            backendService.addTask(email!, password!, newtask).then((response) => {
                // if task added successfully, reload page
                if (response === "success") {
                    console.log('task added');
                    window.location.reload();
                }
            });
        }
    }

    return ( 
    
    <div className={styles.profileInfoItem}>
      <form className={styles.formContainer} onSubmit={addTask}>
        <label className={styles.label}>add task</label>
        
        <div className={styles.innerFormContainer} >
            <input type="test" name="addTask" id="addTask" className={styles.input} onChange={(event) => setNewTask(event.target.value)}/>
            <button className={styles.addbutton} type='submit'>add</button>
        </div>
        
      </form>
    </div>
    )
}

export default AddTaskForm;