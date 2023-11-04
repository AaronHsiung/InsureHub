import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Policy({ policy, onDelete, onEdit }) {
    return (
        <tr>
            <td>{policy.policyNumber}</td>
            <td>{policy.policyType}</td>
            <td>{policy.paymentDate}</td>
            <td>< MdEdit onClick={ () => onEdit(policy)} /></td>
            <td>< MdDeleteForever onClick={ () => onDelete(policy._id)} /></td>
        </tr>
    );
}

export default Policy;