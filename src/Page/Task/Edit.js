import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Edit({ tasks, selectedTask, setTasks, setIsEditing }) {

    const id = selectedTask.id;

    const [title, setTitle] = useState(selectedTask.title);
    const [description, setDescription] = useState(selectedTask.description);
    const [employee, setEmployee] = useState(selectedTask.employee);
    const [date, setDate] = useState(selectedTask.date);

    const handleUpdate = e => {
        e.preventDefault();

        if (!title || !description || !employee || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const task = {
            id,
            title,
            description,
            employee,
            date
        };

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1, task);
                break;
            }
        }

        setTasks(tasks);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${task.title} ${description}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Task</h1>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="employee">Employee</label>
                <input
                    id="employee"
                    type="text"
                    name="employee"
                    value={employee}
                    onChange={e => setEmployee(e.target.value)}
                />
                <label htmlFor="date">Due date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit