import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';


const MyOrders = () => {

    // get user
    const [user] = useAuthState(auth);

    const [orders, setOrders] = useState([]);

    const email = user?.email;

    const navigate = useNavigate();


    useEffect(() => {

        if (user) {
            fetch(`http://localhost:5000/order?buyer=${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {

                    // console.log(res);

                    if (res.status === 401 || res.status === 403) {

                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }

                    return res.json();
                })

                .then(data => {
                    setOrders(data)
                })
        }

    }, [orders, user, email, navigate]);


    // Delete button handler
    const handleDelete = id => {

        const proceed = window.confirm('Are you sure to delete?');

        if (proceed) {
            const url = `http://localhost:5000/orders/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    const remaining = orders.filter(order => order._id !== id);
                    setOrders(remaining);
                });
        }
    };


    return (
        <div>
            <h1 className='profile-title text-primary'>My Order List</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{order.buyerName}</td>
                                <td>{order.tool}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.price * order.quantity}</td>
                                <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs bg-green-600 text-white font-bold'>Pay</button></Link>}
                                    {(order.price && order.paid) && <div>
                                        <span className='text-green-600 font-bold'>Paid</span>
                                        <p>Transaction Id: <span className='text-orange-600'>{order.transactionId}</span></p>
                                    </div>}
                                </td>
                                <td>
                                    {(order.price && !order.paid) ? <button onClick={() => handleDelete(order._id)} className='btn btn-xs btn-error text-white font-bold'>Cancel</button> : ''}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;