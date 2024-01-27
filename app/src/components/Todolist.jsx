import React, { useState, useRef, useEffect } from "react"

export default function Todolist(props) {  
    const [isUpdated, setIsUpdated] = useState(false) // state to manage the local UI when updating flipping two templates
    const [newName, setNewName] = useState("")
    
    const { id, name, isCompleted, toggleTaskCompleted, deleteTask, updatedTasks } = props
    
    const editFieldRef = useRef(null) // null until the user attach them to its respective element input field
    const editButtonRef = useRef(null) // same as above but for the Edit button

    // manage side effect for focusing on edit and input while using tab keyscore
    useEffect(() => {
        if (isUpdated) {
            editFieldRef.current.focus()
        } else {
            editButtonRef.current.focus()
        }
    }, [isUpdated])

    function handleChange(e) {
        setNewName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        updatedTasks(id, newName)
        setNewName("")
        setIsUpdated(false)
    }

    const updatingTemplate = (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={id}>New name for {name}</label>
                <input
                    id={id}
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                    />
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => setIsUpdated(false)}
                    >
                    Cancel
                    <span className="visually-hidden"> renaming {name}</span>
                </button>
                <button type="button" onClick={handleSubmit}>
                    Save
                    <span className="visually-hidden"> new name for {name}</span>
                </button>               
            </div>
        </form>
    )

    const viewTemplate = (
        <div>
            <div>
                <input
                    id={id}
                    type="checkbox"
                    className="custom-checkbox"
                    defaultChecked={isCompleted}
                    onChange={() => toggleTaskCompleted(id)}
                    />
                <label htmlFor={id} className="checkbox-label">
                    {name}
                </label>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => setIsUpdated(true)}
                    ref={editButtonRef}
                    >
                    Update <span>{name}</span>
                </button>
                <button
                    type="button"
                    onClick={() => deleteTask(id)}
                    >
                    Delete <span>{name}</span>
                </button>
            </div>
        </div>
    )

    return (
        <>
            <li>{isUpdated ? updatingTemplate : viewTemplate}</li>
        </>
    );
}
