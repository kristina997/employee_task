import React, { useState, useRef } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Add({ teams, setTeams, setIsAdding }) {

    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [employeeList, setEmployeeList] = useState([{ employee: "" }]);

    const textInput = useRef(null);

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
        setEmployeeList([...employeeList, {employee:""}]);
      };
    
      const handleRemoveEmployee = (index) => {
        const newList = [...employeeList];
        newList.splice(index, 1);
        setEmployeeList(newList);
      };

    const handleAdd = e => {
        e.preventDefault();
        if (!name || !task || !description || !deadline ) {
            return ;
        }
    
        const id = teams.length + 1;
        const newTeams = {
            id,
            name,
            task,
            description,
            employeeList,
            deadline,
            isActive
        };
        
        teams.push(newTeams);
        setTeams(teams);
        setIsAdding(false);
    
        if (e.target.id === 'add-button') {
            Swal.fire({
            icon: 'success',
            title: 'Dodato!',
            text: `Podaci o timu ${name} su uspešno dodati.`,
            showConfirmButton: false,
            timer: 1500
            });
        }
    } 
    
    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Team</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    ref={textInput}
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="task">Task</label>
                <input
                    id="task"
                    type="text"
                    ref={textInput}
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
                            value={list.employee}
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
                <label htmlFor="deadline">Deadline</label>
                <input
                    id="deadline"
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
                <label htmlFor="status">Status:</label>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggleActive(teams.id)}
                /> {isActive ? 'Active' : 'Inactive'}
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add"/>
                    <input
                        style={{ marginLeft: '12px' }}
                        className="add-button"
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