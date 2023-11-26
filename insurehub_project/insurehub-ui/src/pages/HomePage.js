import React from 'react';
import { Link } from 'react-router-dom';
import PolicyList from '../components/PolicyList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setPolicyToEdit, setPolicyToView }) {
    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();

    const onDelete = async _id => {
        // Show a confirmation dialog
        if (window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
            const response = await fetch(`/policies/${_id}`, { method: 'DELETE' });
            if (response.status === 204){
                const newPolicies = policies.filter(m => m._id !== _id);
                setPolicies(newPolicies);
            } else {
                console.error(`Failed to delete policy with _id = ${_id}, status code = ${response.status}`);
            }
        }
    };
    
    const onView = policy => {
        setPolicyToView(policy);
        navigate("/view-policy");
    }

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
            <PolicyList policies={policies} onDelete={onDelete} onEdit={onEdit} onView={onView}></PolicyList>

            <div className="nav-container">
                <nav className="App-nav-add-plicy">
                    <Link to="/add-policy">Add New Policy</Link>
                </nav>
                {/* 
                <nav className="App-nav" >
                    <Link to="/">Log out</Link>
                </nav>
                */}
            </div>
        </>
    );
}

export default HomePage;