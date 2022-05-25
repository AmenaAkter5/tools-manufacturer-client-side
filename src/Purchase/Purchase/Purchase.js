import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import './Purchase.css';



const Purchase = () => {


    // get user
    const [user] = useAuthState(auth);

    // get dynamic parameter of route
    const { id } = useParams();



    // if use react query
    /* const { data: tool, isLoading, refetch } = useQuery('tools', () =>

        fetch(`http://localhost:5000/available?date=${formattedDate}`)
            .then(res => res.json()

            )
    ) */


    // tool data state
    const [tool, setTool] = useState({});


    // fetch data

    useEffect(() => {

        const url = `http://localhost:5000/tools/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setTool(data))

    }, [id, tool]);



    // destructure
    const { _id, img, description, name, price, available, minimum } = tool;



    const handleOrder = event => {
        event.preventDefault();

        const orderQuantity = parseInt(event.target.quantity.value);
        // console.log(quantity);

        // order data
        const order = {
            toolId: _id,
            tool: name,
            quantity: orderQuantity,
            price: price,
            buyer: user.email,
            buyerName: user.displayName,
            phone: event.target.phone.value,
            address: event.target.address.value,
        }


        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {

                // console.log(data);

                // order success
                if (data.insertedId) {
                    toast.success('Order is placed successfully!!')
                }

                // order unsuccess
                else {
                    toast.error('Fail to place order')
                }



                // update available quantity
                const quantity = parseInt(available - orderQuantity);
                const updatedItem = { quantity };


                // update data to server
                const url = `http://localhost:5000/tools/${_id}`

                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                })
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                    })


                event.target.reset();
                setMinQuantity(minimum);

                // refetch from react query
                // refetch();


            })


    }



    // minimum order quantity state
    const [minQuantity, setMinQuantity] = useState(0);

    useEffect(() => {
        setMinQuantity(minimum);
    }, [minimum]);


    // minimum order input change handler
    const handleChange = event => {
        setMinQuantity(event.target.value);
    }


    /* // use navigate hook
    const navigate = useNavigate();

    // manage inventory button handler
    const manageInventoryHandle = () => {
        navigate('/inventory');
    } */



    return (
        <section className='py-14 bg-accent'>
            <div className='text-center mb-12'>
                <h1 className='text-secondary text-xl font-bold uppercase'>Purchase Details</h1>
                <h1 className='text-4xl mt-3 text-primary'>Detail about <span className='text-secondary font-bold'>{name}</span></h1>
            </div>
            <div className='product-container'>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img width={200} src={img} alt="services" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center text-primary">{name}</h2>
                        <h4 className='text-xl text-center mb-2'>$<span className='text-secondary font-bold'>{price}</span> (per unit)</h4>
                        {
                            available === 0
                                ?
                                <h5 className='text-left mb-0 text-xl text-red-600 font-bold'>Out of Stock</h5>
                                :
                                <p className='text-left leading-none'><span className='font-bold'>Available Quantity:</span> {available} {name === 'Jackfruit' || name === 'Water Mealon' ? 'Kg' : 'Pieces'}</p>
                        }
                        <p className='text-left mt-0'><span className='font-bold'>Minimum order quantity:</span> {minimum} {name === 'Jackfruit' || name === 'Water Mealon' ? 'Kg' : 'Pieces'}</p>
                        <p className='text-justify mb-4'>{description}</p>
                    </div>
                </div>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div>
                            <div>
                                <h5 className='text-center font-sans text-primary font-bold text-2xl my-3'>Please Order Confirm</h5>
                            </div>

                            <form onSubmit={handleOrder} className='grid grid-cols-1 gap-4 justify-items-center mt-6'>

                                <input type="text" name='name' readOnly disabled value={user?.displayName || ''} className="input-field max-w-xs" />

                                <input type="email" name='email' readOnly value={user?.email || ''} className="input-field max-w-xs" />

                                <input type="text" name='phone' placeholder="Phone Number" className="input-field max-w-xs" />

                                <input type="text" name='address' placeholder="Your Address" className="input-field max-w-xs" />


                                <label className="label">
                                    <span className="label-text font-bold">Order Quantity</span>
                                </label>
                                <input type="text" name='quantity' value={minQuantity || ''} onChange={handleChange} className="input-field max-w-xs" />
                                <label className="label">
                                    {minimum > minQuantity && <span className="label-text text-red-600">You cant't place order below than minimum quantity</span>}
                                    {minQuantity > available && <span className="label-text text-red-600">You cant't place order more than available quantity</span>}
                                </label>

                                <input type="submit" disabled={minimum > minQuantity || minQuantity > available} value='Place Order' className="btn btn-secondary text-white w-full max-w-xs" />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='text-center'>
                <button onClick={manageInventoryHandle} style={{ color: '#220768', fontSize: '20px' }} className='btn btn-link fw-bold mt-5 px-5 bg-white'>Manage Inventories</button>
            </div> */}
        </section>
    );
};

export default Purchase;