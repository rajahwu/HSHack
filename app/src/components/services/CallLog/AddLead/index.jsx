// src/components/services/CallLog/AddLead.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const AddLead = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add lead submission logic here
        navigate(`/${user.displayName}/call-log/leads`);
    };

    return (
        <div>
            <h2>Add a New Lead</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="leadName">Lead Name:</label>
                    <input type="text" id="leadName" name="leadName" required />
                </div>
                <div>
                    <label htmlFor="leadEmail">Lead Email:</label>
                    <input type="email" id="leadEmail" name="leadEmail" required />
                </div>
                <div>
                    <label htmlFor="leadPhone">Lead Phone:</label>
                    <input type="tel" id="leadPhone" name="leadPhone" required />
                </div>
                <button type="submit">Add Lead</button>
            </form>
            <h2>Auto Generate Leads</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="leadCount">Number of Leads:</label>
                <input type="number" id="leadCount" name="leadCount" required />
                <button type="submit">Auto Generate</button>
            </form>
        </div>
    );
};

export default AddLead;
