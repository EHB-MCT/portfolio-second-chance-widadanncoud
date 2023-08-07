import { useEffect, useState } from 'react';
import styles from './taskItem.module.css';
import { backendService } from '../../../services/backendService';

function TaskItem({ task}: { task: string}) {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>('');


    // update task status
    const updateStatus = () => {
        setIsCompleted(!isCompleted);
    }

    // update task
    const updateTask = (event: any) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        // update task in backend
        backendService.updateTask(email!, password!, task, newTask).then((response) => {
            if (response === 'success') {
                window.location.reload();
            }
        });
    }

    // delete task if user has marked it as completed
    useEffect(() => {
        if (isCompleted) {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            backendService.deleteTask(email!, password!, task)
        }
    }, [isCompleted, task]);

    useEffect(() => {
        setNewTask(task);
    }, [setIsCompleted, task]);


    return (
    <>
        {editTask ? (
        <>
            <form onSubmit={updateTask} className={styles.updateTaskForm}>
                <input type="text" name="updateTask" id="updateTask" className={styles.updateTaskInputField}
                value={newTask} onChange={(event) => setNewTask(event.target.value)} />
                <button className={styles.updateButton} type="submit">update</button>
            </form>
        </>) : (<div className={styles.taskItemContainer}>
                <p className={styles.taskItemText} style={isCompleted ? { textDecoration: 'line-through' } : {}}>{task}</p>
                <div className={styles.taskItemActions}>
                    <button className={styles.editButton} onClick={() => {setEditTask(true)}}>edit</button>
                    <input type="checkbox" name="completeTask" id="completeTask" className={styles.completeTask} onChange={updateStatus}/>
                </div>
        </div>)}
    </>
    );
}

export default TaskItem;