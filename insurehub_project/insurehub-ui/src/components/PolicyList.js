import React from 'react';
import Policy from './Policy';

function PolicyList({ policies, onDelete, onEdit, onView }) {

    return (
        <table id="policies">
            <thead>
                <tr>
                    <th>Policy Number</th>
                    <th>Policy Type</th>
                    <th>Payment Date</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {policies.map((policy, i) => <Policy policy={policy}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onView={onView}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default PolicyList;
