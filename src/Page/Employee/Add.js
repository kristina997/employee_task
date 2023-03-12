import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

function Add({ employees, setEmployees, setIsAdding }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!fullName || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true,
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
            id,
            fullName,
            email,
            salary,
            date,
        };
        employees.push(newEmployee);
        setEmployees([...employees]); 

        // save a new version in local storage
        localStorage.setItem('employees', JSON.stringify([...employees, newEmployee]));

        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${fullName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    ref={textInput}
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="salary">Monthly salary ($)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <label htmlFor="date">Date Birth</label>
                <input id="date" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
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