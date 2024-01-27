import React, { useEffect, useState } from "react";
import Todolist from "./components/Todolist";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";

// Object to define filters by name and behaviour
const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.isCompleted,
    Completed: (task) => task.isCompleted,
};

const FILTER_NAMES = Object.keys(FILTER_MAP); // create an array of filter names

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    // reference to the collection
    const todoCollectionRef = collection(db, "todo");

    //fetch from Firestore
    useEffect(() => {
        // listen for updates
        const unsubscribe = onSnapshot(todoCollectionRef, (snapshot) => {
            const tasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(tasks);
        });

        return unsubscribe;
    }, []);

    async function addTask(name) {
        /*     const newTask = { id: nanoid(), name, isCompleted: false}
    setTasks([...tasks, newTask]) */
        await addDoc(todoCollectionRef, {
            name: name,
            isCompleted: false,
        });
    }

    async function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                const updatedTask = { ...task, isCompleted: !task.isCompleted };

                // firestore doc reference
                const taskRef = doc(db, "todo", task.id);

                // update the task in firestore
                updateDoc(taskRef, { isCompleted: updatedTask.isCompleted });

                return updatedTask;
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        // firebase doc reference
        const taskRef = doc(db, "todo", id);

        // delete the task from firestore
        deleteDoc(taskRef)
            .then(() => {
                // update the state only after the task is deleted
                const remainingTasks = tasks.filter((task) => id !== task.id);
                setTasks(remainingTasks);
            })
            .catch((error) => {
                console.log("Error deleting task: ", error);
            });
    }

    function updatedTasks(id, newName) {
        const updatedTasksList = tasks.map((task) => {
            if (id === task.id) {
                const updatedTask = { ...task, name: newName };

                // firestore document reference
                const taskRef = doc(db, "todo", id);

                // update the task in firestore
                updateDoc(taskRef, { name: newName });

                return updatedTask;
            }
            return task;
        });

        setTasks(updatedTasksList);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map((task) => (
            <Todolist
                key={task.id}
                id={task.id}
                name={task.name}
                isCompleted={task.isCompleted}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                updatedTasks={updatedTasks}
            />
        ));

    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const countingTasks = `${taskList.length} ${tasksNoun} remaining`;

    return (
        <div className="app">
                <h1>Task Manager</h1>
                <h2 id="list-heading">{countingTasks}</h2>

            <Form addTask={addTask} />
            <div className="filters btn-group">{filterList}</div>
            <ul
                role="list"
                className="todo-list"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default App;
