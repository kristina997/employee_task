import React, { useState } from 'react'
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

function Team() {

    const [teams, setTeams] = useState(JSON.parse(localStorage.getItem('teams')));
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    
    const handleEdit = (id) => {
        const [team] = teams.filter(team => team.id === id);

        setSelectedTeam(team);
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
                const [team] = teams.filter(team => team.id === id);

                Swal.fire({
                    icon: 'success',
                    name: 'Deleted!',
                    text: `${team.name}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTeams(teams.filter(team => team.id !== id));
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
                        teams={teams}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    teams={teams}
                    setTeams={setTeams}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    teams={teams}
                    selectedTeam={selectedTeam}
                    setTeams={setTeams}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Team;