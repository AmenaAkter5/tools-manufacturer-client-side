import React, { useEffect, useState } from 'react';
import Review from './Review';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetch('reviews.json')
            // fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [reviews]);


    // reviews reverse to get latest collection of tools
    const latestReviews = [...reviews].reverse();


    return (
        <div className='my-28'>
            <div className='text-center'>
                <h1 className='text-secondary text-xl font-bold uppercase'>Testimonials</h1>
                <h1 className='text-4xl'>What Our Customers Say</h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    latestReviews.slice(0, 6).map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;