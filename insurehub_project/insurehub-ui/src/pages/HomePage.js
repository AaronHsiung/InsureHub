import React from 'react';
import { Link } from 'react-router-dom';
import PolicyList from '../components/PolicyList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setPolicyToEdit }) {
    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/policies/${_id}`, { method: 'DELETE' });
        if (response.status === 204){
            const newPolicies = policies.filter(m => m._id !== _id);
            setPolicies(newPolicies);
        } else {
            console.error(`Failed to delete policy with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = policy => {
        setPolicyToEdit(policy);
        navigate("/edit-policy");
    }

    const loadPolicies = async () => {
        const response = await fetch('/policies');
        const data = await response.json();
        setPolicies(data);
    }

    useEffect(() => {
        loadPolicies();
    }, []);

    return (
        <>          
            <PolicyList policies={policies} onDelete={onDelete} onEdit={onEdit}></PolicyList>

            <div className="nav-container">
                <nav className="App-nav-add-plicy">
                    <Link to="/add-policy">Add New Policy</Link>
                </nav>
                <nav className="App-nav">
                    <Link to="/">Log out</Link>
                </nav>
            </div>
        </>
    );
}

export default HomePage;