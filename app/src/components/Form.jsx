import React, { useState } from "react";

export default function Form(props) {
    const [formData, setFormData] = useState("")

    function handleChange(e) {
        setFormData(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formData.length > 0) {
            props.addTask(formData)
            setFormData("")
        } else {
            alert("Type something!")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Add something to do:</h3>
                <input
                    type="text"
                    id="input-el"
                    placeholder="Add somtheing..."
                    name="text"
                    autoComplete="off"
                    className="input-el"
                    value={formData}
                    onChange={handleChange}
                />
                <button type="submit">Add</button>
            </form>
        </>
    );
}
