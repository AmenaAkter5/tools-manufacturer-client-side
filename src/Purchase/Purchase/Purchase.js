import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';



const Purchase = () => {


    const [user] = useAuthState(auth);

    // get dynamic parameter of route
    const { id } = useParams();


    // fruit item data state
    const [tool, setTool] = useState({});


    // fetch data

    useEffect(() => {

        const url = `http://localhost:5000/tools/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setTool(data))

    }, [id, tool]);


    /* const { data: tool, isLoading, refetch } = useQuery('tools', () =>

        fetch(`http://localhost:5000/available?date=${formattedDate}`)
            .then(res => res.json()

            )
    ) */


    // destructure
    const { img, description, name, price, available, minimum } = tool;


    // delivered button handle
    const deliverdButtonHandle = () => {

        // update quantity
        const quantity = parseInt(tool.available) - 1;
        const updatedItem = { quantity };


        // update data to server
        const url = `https://pure-cliffs-64798.herokuapp.com/fruits/${id}`

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
            })
    };



    // restock form submission handle
    const handleUpdateQuantity = event => {
        event.preventDefault();

        // update quantity
        const restockedQuantity = event.target.quantity.value;
        const quantity = tool.available + parseInt(restockedQuantity);

        const updatedItem = { quantity };

        // update data to server
        const url = `https://pure-cliffs-64798.herokuapp.com/fruits/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                event.target.reset();
            })
    };


    // use navigate hook
    const navigate = useNavigate();

    // manage inventory button handler
    const manageInventoryHandle = () => {
        navigate('/inventory');
    }


    return (
        <section className='my-28'>
            <div className='text-center'>
                <h1 className='text-secondary text-xl font-bold uppercase'>Purchase Details</h1>
                <h1 className='text-4xl'>Detail about <span className='text-orange-500'>{name}</span></h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={img} alt="services" className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="text-xl font-bold text-center">{name}</h2>
                        <h4 className='text-xl text-center mb-2'>$<span className='text-orange-500 font-bold'>{price}</span> (per unit)</h4>
                        {
                            available === 0
                                ?
                                <h5 className='text-left mb-0 text-xl text-red-600 font-bold'>Out of Stock</h5>
                                :
                                <p className='text-left leading-none'><span className='font-bold'>Available Quantity:</span> {available} {name === 'Jackfruit' || name === 'Water Mealon' ? 'Kg' : 'Pieces'}</p>
                        }
                        <p className='text-left mt-0'><span className='font-bold'>minimum order quantity:</span> {minimum} {name === 'Jackfruit' || name === 'Water Mealon' ? 'Kg' : 'Pieces'}</p>
                        <p className='text-justify mb-4'>{description}</p>
                        {/* <button onClick={() => purchaseStockHandler(_id)} className="btn btn-primary bg-gradient-to-r from-secondary to-primary uppercase text-white font-bold">Purchase</button> */}
                    </div>
                </div>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className='restock-content'>
                            <div>
                                <h3 className='text-center text-white mb-4'>Restock the items</h3>
                            </div>
                            {/* <form onSubmit={handleUpdateQuantity} className='text-center'>
                                <input className='me-2 p-1 w-50' type="number" name="quantity" id="" placeholder='Input Your Item Number' />
                                <input style={{ color: '#220768' }} className='px-3 py-1 fw-bold' type="submit" value="Restock" />
                            </form> */}
                            <form onSubmit={handleUpdateQuantity} className='grid grid-cols-1 gap-4 justify-items-center mt-6'>
                                {/* 
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' placeholder="Email Address" className="input input-bordered w-full max-w-xs" />
                        */}

                                {/* module-73 */}
                                <input type="text" name='name' readOnly value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                                <input type="email" name='email' readOnly value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                                <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                                <input type="text" name='address' placeholder="Your Address" className="input input-bordered w-full max-w-xs" />
                                <input type="submit" value='Submit' className="btn btn-secondary text-white w-full max-w-xs" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button onClick={manageInventoryHandle} style={{ color: '#220768', fontSize: '20px' }} className='btn btn-link fw-bold mt-5 px-5 bg-white'>Manage Inventories</button>
            </div>
        </section>
    );
};

export default Purchase;