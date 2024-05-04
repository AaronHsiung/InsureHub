import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ViewPolicyPage = ({ policyToView }) => {

    const [policyNumber] = useState(policyToView.policyNumber);
    const [policyProvider] = useState(policyToView.policyProvider);
    const [policyType] = useState(policyToView.policyType);
    const [startDate] = useState(policyToView.startDate);
    const [endDate] = useState(policyToView.endDate);
    const [premium] = useState(policyToView.premium);
    const [paymentDate] = useState(policyToView.paymentDate);

    const navigate = useNavigate();

    // Function to export the policy
    const exportPolicy = async () => {
        // Creating an object with the current state of the policy details
        const exportedPolicy = {
            policyNumber, 
            policyProvider, 
            policyType, 
            startDate, 
            endDate, 
            premium, 
            paymentDate
        };
        console.log('Sending data to server and the download will start in a minute.');
        console.log(exportedPolicy);
        // Sending a POST request to the server with the policy details
        const response = await fetch(`http://localhost:5000/export-to-pdf`,{
            method: 'POST',
            body: JSON.stringify(exportedPolicy),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Checking the response status and displaying an alert accordingly
        if(response.status === 200){
            window.location.href = 'http://localhost:5000/output.pdf';
            alert("Successfully exported the policy");
        } else{
            alert(`Failed to export policy, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h3>View Policy Details</h3>
            <div className = "form-group">
                <label>Policy Number:</label>
                <span>{policyToView.policyNumber}</span>
            </div>
            <div className = "form-group">
                <label>Policy Provider:</label>
                <span>{policyToView.policyProvider}</span>
            </div>
            <div className = "form-group">
                <label>Policy Type:</label>
                <span>{policyToView.policyType}</span>
            </div>
            <div className = "form-group">
                <label>Start Date:</label>
                <span>{policyToView.startDate}</span>
            </div>
            <div className = "form-group">
                <label>End Date:</label>
                <span>{policyToView.endDate}</span>
            </div>            
            <div className = "form-group">
                <label>Premium:</label>
                <span>{policyToView.premium}</span>
            </div>
            <div className = "form-group">
                <label>Payment Date:</label>
                <span>{policyToView.paymentDate}</span>
            </div>
            <div className="nav-container">
                <nav className="App-nav-function">
                    <button onClick={exportPolicy}>Export</button>
                </nav>
                <nav className="App-nav">
                    <Link to="/">Back</Link>
                </nav>
            </div>
        </div>
    );
}

export default ViewPolicyPage;