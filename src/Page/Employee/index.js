import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data/index';

function Employee() {

    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employees')) || employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleDelete = (id) => {
      const [employee] = employees.filter((employee) => employee.id === id);
  
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `${employee.fullName}'s data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
  
          // Update the employees array
          const updatedEmployees = employees.filter(
            (employee) => employee.id !== id
            );
          setEmployees(updatedEmployees);
          localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        }
      });
    };
  
    const handleAdd = (employee) => {
      const updatedEmployees = [...employees, employee];
      setEmployees(updatedEmployees);
      setIsAdding(false);
    
      // Update Local Storage with the updated employees array
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    
      // Check if LocalStorage was updated successfully
      const data = localStorage.getItem("employees");
      if (!data || JSON.parse(data).length !== updatedEmployees.length) {
        console.error("LocalStorage not updated successfully");
      }
    };
    
  
    const handleEdit = (id) => {
      const employee = employees.find((employee) => employee.id === id);
  
      if (employee) {
        setSelectedEmployee(employee);
        setIsEditing(true);
      } else {
        console.log(`Employee with ID ${id} not found`);
      }
    };
  
    const handleList = () => {
      setIsAdding(false);
      setIsEditing(false);
    };
  
    return (
      <div className="container">
        {/* List */}
        {!isAdding && !isEditing && (
          <>
            <Header setIsAdding={setIsAdding} setList={handleList} />
            <List
              employees={employees}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
            />
          </>
        )}
        {/* Add */}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
            setList={handleList}
          />
        )}
        
      {/* Edit */}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          setList={handleList}
        />
      )}
    </div>
  );
}

export default Employee;
