import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* <!-- Page content here --> */}
                <h1 className='text-3xl font-bold text-secondary'>Welcome to your Dashboard</h1>

                {/* dashboard এর ভিতরের component গুলোকে use করা হয়েছে */}

                <Outlet></Outlet>

                {/* Navbar এ সরানো হয়েছে */}

                {/* <label htmlFor="dashboard-sidebar" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">

                    {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard">My Profile</Link></li>
                    <li><Link to="/dashboard/orders">My Orders</Link></li>
                    <li><Link to="/dashboard/history">My History</Link></li>
                    {/* <li><Link to="/dashboard/users">All Users</Link></li> */}
                    {/* admin && <>
                        <li><Link to="/dashboard/users">All Users</Link></li>
                        <li><Link to="/dashboard/addDoctor">Add New Doctor</Link></li>
                        <li><Link to="/dashboard/manageDoctors">Manage Doctors</Link></li>
                    </> */}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;