import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { tasksData } from '../../data/tasks'

function Task() {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || tasksData);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')));

    // fetch employees data and update the state -- backend if exist
    // useEffect(() => {
    //     fetch('/employee')
    //     .then(response => response.json())
    //     .then(data => setEmployees(data))
    //     .catch(error => console.log(error));
    // }, []);

    const handleEdit = (id) => {
        const [task] = tasks.filter(task => task.id === id);

        setSelectedTask(task);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [task] = tasks.filter(task => task.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${task.title} ${task.descrtiption}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTasks(tasks.filter(task => task.id !== id));
            }
        });
    }

    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        tasks={tasks}
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    tasks={tasks}
                    setTasks={setTasks}
                    setIsAdding={setIsAdding}
                    employees={employees}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    tasks={tasks}
                    selectedTask={selectedTask}
                    setTasks={setTasks}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Task;