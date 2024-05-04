import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CreatePolicyPage = () => {

    const [policyNumber, setPolicyNumber] = useState('');
    const [policyProvider, setPolicyProvider] = useState('');
    const [policyType, setPolicyType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');    
    const [premium, setPremium] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const navigate = useNavigate();

    const addPolicy = async () => {
        const newPolicy = {
            policyNumber, 
            policyProvider, 
            policyType, 
            startDate, 
            endDate, 
            premium, 
            paymentDate
        };
        const response = await fetch('/policies',{
            method: 'POST',
            body: JSON.stringify(newPolicy),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the policy!");
        } else{
            const errorData = await response.json();
            //console.log(errorData.Error);
            const errorMessage = errorData.Error || `Failed to add policy, status code = ${response.status}`;
            alert(errorMessage);
            //alert(`Failed to add policy, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h3>Add New Policy</h3>
            <div className = "form-group">
                <label>Policy Number:</label>
                <input
                    type="text"
                    value={policyNumber}
                    placeholder="Enter your policy number"
                    onChange={e => setPolicyNumber(e.target.value)} />
            </div>
            <div className = "form-group">
                <label>Policy Provider:</label>
                <input
                    type="text"
                    value={policyProvider}
                    placeholder="Enter your policy provider"
                    onChange={e => setPolicyProvider(e.target.value)} />
            </div>
            <div className = "form-group">
                <label>Policy Type:</label>
                <input
                    type="text"
                    value={policyType}
                    placeholder="Enter your policy type"
                    onChange={e => setPolicyType(e.target.value)} />
            </div>
            <div className = "form-group">
                <label>Start Date:</label>
                <input
                    type="text"
                    value={startDate}
                    placeholder="Enter your policy start date (MM-DD-YYYY)"
                    onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className = "form-group">
                <label>End Date:</label>
                <input
                    type="text"
                    value={endDate}
                    placeholder="Enter your policy end date (MM-DD-YYYY)"
                    onChange={e => setEndDate(e.target.value)} />
            </div>            
            <div className = "form-group">
                <label>Premium:</label>
                <input
                    type="number"
                    value={premium}
                    placeholder="Enter your policy premium"
                    onChange={e => setPremium(e.target.value)} />
            </div>
            <div className = "form-group">
                <label>Payment Date:</label>
                <input
                    type="text"
                    value={paymentDate}
                    placeholder="Enter next payment date (MM-DD-YYYY)"
                    onChange={e => setPaymentDate(e.target.value)} />
            </div>
            <div className="nav-container">
                <nav className="App-nav-function">
                    <button onClick={addPolicy}>Save</button>
                </nav>
                <nav className="App-nav">
                    <Link to="/">Back</Link>
                </nav>
            </div>
        </div>
    );
}

export default CreatePolicyPage;