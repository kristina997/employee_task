import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';

function Add({ tasks, setTasks, setIsAdding, employees }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleChange = (event) => {
        setEmployee(event.target.value);
    };

    const handleAdd = e => {
        e.preventDefault();
        if (!title || !description || !employee || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = tasks.length + 1;
        const newTasks = {
            id,
            title,
            description,
            employee,
            date
        }
        tasks.push(newTasks);
        setTasks(tasks);
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${title}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Tasks</h1>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    ref={textInput}
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
                <label htmlFor="employee"> Employee </label>
                <select id="employee-select" value={employee} onChange={handleChange}>
                    <option value="">Choose employee</option>
                        {employees.map((employee) => (
                        <option key={employee.id} value={employee.fullName}>{employee.fullName}</option>
                    ))}
                </select>
                <label htmlFor="date">Due date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add