import { useEffect, useState } from 'react';
import styles from './homePage.module.css';
import AddTaskForm from './components/addTaskForm';
import TaskItem from './components/TaskItem';
import { backendService } from '../../services/backendService';

function Homepage() {
    const [taskIsRetrieved, setTaskIsRetrieved] = useState<boolean>(false); 
    const [tasks, setTasks] = useState<string[]>([]); 

    //get user tasks once the page is loaded
    useEffect(() => {
        if (!taskIsRetrieved) {
            getUserTasks()
            setTaskIsRetrieved(true);
        }
    }, [taskIsRetrieved]);

    

    const getUserTasks = async () => {
        //get user email and password from local storage
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        //get user tasks from backend
        await backendService.getTasks(email!, password!).then(response => {
            setTasks(response!);
        })
    };

    return ( 
    <div className={styles.homePageContainer}>
        <h1 className={styles.title}>ALL</h1>

        <AddTaskForm />
        <div className={styles.tasksContainer}>
            {tasks.map((task, index) => <TaskItem key={index} task={task} />) }
        </div>
    </div> );
}

export default Homepage;