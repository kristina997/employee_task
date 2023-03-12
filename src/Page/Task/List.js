import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function List({ tasks, handleEdit, handleDelete }) {

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Employee</th>
            <th>Due date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <tr key={task.id}>
                <td>{i + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.employee}</td>
                <td>{task.date}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="button muted-button"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="button muted-button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Tasks</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
