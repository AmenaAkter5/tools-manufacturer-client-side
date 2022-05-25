import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user, refetch, index }) => {

    const { email } = user;

    const makeAdmin = () => {

        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {

                if (res.status === 403) {
                    toast.error('Failed to make an admin')

                    // log out করে দিতে পারি ও token remove করে দিতে পারি
                }

                return res.json()
            })
            .then(data => {
                // console.log(data);

                // refetch();
                // toast.success('Successfully made an admin');

                // if (data.modifiedCount) { // or, নিচের লাইন
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Successfully made an admin');
                }
            })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <th>{email}</th>
            <th><button onClick={makeAdmin} className="btn btn-xs btn-primary text-white">Make Admin</button></th>
            <th><button className="btn btn-xs btn-secondary text-white">Remove User</button></th>
        </tr>
    );
};

export default UserRow;