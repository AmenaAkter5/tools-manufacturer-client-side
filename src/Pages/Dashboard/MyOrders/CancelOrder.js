import React from 'react';


const CancelOrder = ({ orders, setOrders, order, setOrder }) => {


    const handleDelete = id => {

        const url = `http://localhost:5000/orders/${id}`
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const remaining = orders.filter(order => order._id !== id);
                setOrders(remaining);
                setOrder(null)
            });

    };


    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello {order.buyerName}</h3>
                    <p className="py-4">Are You Sure to cancel {order.tool}'s order</p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" onClick={() => handleDelete(order._id)} className='btn btn-xs btn-error text-white font-bold'>Cancel</label>
                        <label htmlFor="delete-modal" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelOrder;