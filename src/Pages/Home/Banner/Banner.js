import React from 'react';
import banner1 from '../../../images/banner (1).png';
import './Banner.css';


const Banner = () => {

    return (
        <section className='bg-primary text-white'>
            <div className='banner-body'>
                <div>
                    <h1 className='banner-title'>Toolsify Manufacturer LTD.</h1>
                    <p className='banner-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, iusto! Ducimus quam blanditiis cumque magni repellendus quidem. Reprehenderit nihil cupiditate quam? Possimus ab facilis quasi quod nihil in dolorem voluptas.</p>
                </div>
                <div className='banner-img'>
                    <img src={banner1} alt="banner" />
                </div>
            </div>
        </section>
    );
};

export default Banner;