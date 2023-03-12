import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function List({ teams, handleEdit, handleDelete }) {

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Status</th>
            <th>Due date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team, i) => (
              <tr key={team.id}>
                <td>{i + 1}</td>
                <td>{team.name}</td>
                <td>{team.isActive ? "Active" : "Inactive"}</td>
                <td>{team.deadline}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(team.id)}
                    className="button muted-button"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="button muted-button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No team</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;