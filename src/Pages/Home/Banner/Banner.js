import React from 'react';
import banner1 from '../../../images/banner (1).png';
import './Banner.css';


const Banner = () => {

    return (
        <section className='bg-primary text-white'>
            <div className='banner-body'>
                <div>
                    <h1 className='banner-title'>Toolsify Manufacturer LTD.</h1>
                    <p className='banner-text text-2xl'>Get Your Most Wanted tools easily. Our Delivery team are always available to reach you.</p>
                </div>
                <div className='banner-img'>
                    <img src={banner1} alt="banner" />
                </div>
            </div>
        </section>
    );
};

export default Banner;