import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Edit({ teams, selectedTeam, setTeams, setIsEditing }) {

    const id = selectedTeam.id;

    const [name, setName] = useState(selectedTeam.name);
    const [task, setTask] = useState(selectedTeam.task);
    const [description, setDescription] = useState(selectedTeam.description);
    const [deadline, setDeadline] = useState(selectedTeam.deadline);
    const [isActive, setIsActive] = useState(selectedTeam.isActive);
    const [employeeList, setEmployeeList] = useState(selectedTeam.employeeList);


    const handleToggleActive = () => {
        setIsActive(!isActive);
    };

    const handleEmployeeChange=(e, index)=>{
        const {name, value}= e.target;
        const newList= [...employeeList];
        newList[index][name]= value;
        setEmployeeList(newList);
      }

    const handleAddEmployee = () => {
        setEmployeeList([...employeeList, {employee:''}]);
    };
    
      const handleRemoveEmployee = (index) => {
        const newList = [...employeeList];
        newList.splice(index, 1);
        setEmployeeList(newList);
    };


    const handleUpdate = e => {
        e.preventDefault();

        if (!name || !task || !description || !deadline) {
            return;
        }

        const team = {
            id,
            name,
            task,
            description,
            employeeList,
            deadline,
            isActive
        };

        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id === id) {
                teams.splice(i, 1, team);
                break;
            }
        }

        setTeams(teams);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${name} - ${task}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Team</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="task">Task</label>
                <input
                    id="task"
                    type="text"
                    name="task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {employeeList.map((list, index) => {
                    return (
                    <div>
                        <label htmlFor="employee"> Employee </label>
                        <input
                            type="text"
                            name="employee"
                            class="form-control"
                            value = {list.employee}
                            placeholder="Enter Employee"
                            onChange={(e) => handleEmployeeChange(e, index)}
                        />
                        {employeeList.length !== 1 && (
                            <button onClick={() => handleRemoveEmployee(index)}>
                            <FaTrash/>
                            </button>
                        )}
                        {employeeList.length - 1 === index && (
                            <button  onClick={handleAddEmployee}>
                           <FaPlus/>
                            </button>
                        )}
                        </div>
                    );
                })}
                <label htmlFor="date">Due date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggleActive(teams.id)}
                /> {isActive ? 'Active' : 'Inactive'}
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