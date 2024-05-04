import React from 'react';
import { MdDeleteForever, MdEdit, MdArticle } from 'react-icons/md';

function Policy({ policy, onDelete, onEdit, onView }) {
    return (
        <tr>
            <td>{policy.policyNumber}</td>
            <td>{policy.policyType}</td>
            <td>{policy.paymentDate}</td>
            <td>< MdArticle onClick={ () => onView(policy)} /></td>
            <td>< MdEdit onClick={ () => onEdit(policy)} /></td>
            <td>< MdDeleteForever onClick={ () => onDelete(policy._id)} /></td>
        </tr>
    );
}

export default Policy;