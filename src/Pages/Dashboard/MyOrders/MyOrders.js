import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
// import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {

    // get user
    const [user] = useAuthState(auth);

    const [orders, setOrders] = useState([]);

    const email = user?.email;


    /*  if (!user) {
         return <Loading></Loading>
     } */



    useEffect(() => {

        if (user) {
            fetch(`http://localhost:5000/orders?buyer=${email}`)
                .then(res => res.json())
                .then(data => setOrders(data))
        }
    }, [user, email])



    // module-75 : token এর authorization information headers এ পাঠানোর জন্য

    // useEffect(() => {

    //     if (user) {
    //         fetch(`http://localhost:5000/booking?patient=${email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         })
    //             .then(res => {

    //                 // console.log(res);

    //                 /* if (res.status === 401) {
    //                     // navigate to home page
    //                 }
    //                 else if (res.status === 403) {
    //                     // navigate to home page
    //                 } */

    //                 // এক লাইনেই করি
    //                 /* if (res.status === 401 || res.status === 403) {

    //                     // sign out করে দিবো
    //                     signOut(auth);

    //                     // token কে remove করে দিবো
    //                     localStorage.removeItem('accessToken');

    //                     // navigate to home page
    //                     navigate('/');
    //                 } */

    //                 return res.json();
    //             })

    //             .then(data => {
    //                 setAppointments(data)
    //             })
    //     }

    // }, [user, email, navigate]);

    return (
        <div>
            <h1 className='mb-4'>My Orders: {orders.length}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price (Per Unit)</th>
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
                                {/* module-77 */}
                                <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success text-white font-bold'>Pay</button></Link>}
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