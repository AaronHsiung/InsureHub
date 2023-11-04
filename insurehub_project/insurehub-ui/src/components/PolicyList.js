import React from 'react';
import Policy from './Policy';

function PolicyList({ policies, onDelete, onEdit }) {
    return (
        <table id="policies">
            <thead>
                <tr>
                    <th>Policy Number</th>
                    {/*<th>Reps</th>*/}
                    <th>Policy Type</th>
                    {/*<th>Unit</th>*/}
                    <th>Payment Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {policies.map((policy, i) => <Policy policy={policy}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default PolicyList;
