import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './AddReview.css';



const AddReview = () => {

    const [user] = useAuthState(auth);
    const handleReview = event => {
        event.preventDefault();

        const name = event.target.name.value;
        const price = event.target.price.value;
        const quantity = event.target.quantity.value;
        const supplier = event.target.supplier.value;
        const description = event.target.description.value;
        const img = event.target.url.value;
        const email = user.email

        const item = { name, price, quantity, description, img, supplier, email };

        // console.log(item);


        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Your item successfully added.')
                    event.target.reset();
                }
            })

    }


    return (
        <section className='review-section'>
            <h3 className='review-title text-center text-primary'>Please Add a Review</h3>
            <hr />
            <div className='add-review-container'>
                <div className='review-form'>
                    <form>

                        <label htmlFor="name">Your Name</label>
                        <input className='review-input-field' type="text" name="name" id="" value={user.displayName} disabled readOnly required />

                        <label htmlFor="rating">Rating must be 1 into 5</label>
                        <input className='review-input-field' type="number" name="rating" id="" placeholder='Rating' />

                        <label htmlFor="picture">Your Picture URL</label>
                        <input className='review-input-field' type="text" name="picture" id="" placeholder='Picture URL' />


                        <label htmlFor="address">Type your review</label>
                        <textarea className='address-input-field' name="address" id="" cols="30" rows="2" placeholder='Type your review' required></textarea>

                        <input className='btn btn-secondary text-white font-bold confirm-btn' type="submit" value="Submit" />


                    </form>

                </div>
            </div>
        </section>
    );
};

export default AddReview;