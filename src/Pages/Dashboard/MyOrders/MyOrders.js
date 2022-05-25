import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
// import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {

    // get user
    const [user] = useAuthState(auth);

    const [orders, setOrders] = useState([]);

    const email = user?.email;

    const navigate = useNavigate();


    useEffect(() => {

        if (user) {
            fetch(`http://localhost:5000/orders?buyer=${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {

                    // console.log(res);

                    if (res.status === 401 || res.status === 403) {

                        // sign out
                        signOut(auth);

                        // remove token
                        localStorage.removeItem('accessToken');

                        // navigate to home page
                        navigate('/');
                    }

                    return res.json();
                })

                .then(data => {
                    setOrders(data)
                })
        }

    }, [user, email, navigate]);


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
                            <th>Price (Per Unit)</th>
                            <th>Total Price</th>
                            <th>Payment</th>
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
                                {/* module-77 */}
                                <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs bg-green-600 text-white font-bold'>Pay</button></Link>}
                                    {(order.price && order.paid) && <div>
                                        <span className='text-success'>Paid</span>
                                        <p>Transaction Id: <span className='text-orange-600'>{order.transactionId}</span></p>
                                    </div>}
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