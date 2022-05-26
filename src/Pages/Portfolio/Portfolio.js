import React from 'react';
import './Portfolio.css';


const Portfolio = () => {
    return (
        <div className='profile-section'>
            <div className='profile-container'>


                <div className='profile-content'>
                    <div className='know-me bg-primary'>
                        <h3 className='text-2xl text-center'>Amena Akter</h3>
                        <h5 className='text-secondary font-bold text-center mb-5 mt-1'>Front End Web Developer</h5>
                        <label htmlFor="email">EMAIL</label>
                        <h5 className='mb-3'>amenaakter1952@gmail.com</h5>
                        <h3>EDUCATION</h3>
                        <p>2016 – Current
                            <br />
                            University of Dhaka <br />
                            Dhaka, Bangladesh
                        </p>
                        <p className='my-3'>
                            Bachelor of Business Administration (BBA) <br />
                            Department of International Business.
                        </p>
                    </div>

                    <div className='expertise-container'>
                        <h3 className='text-2xl'>EXPERTISE</h3>

                        <p className='my-1'>HTML5, CSS3, Bootstrap5, Tailwind, DaisyUI, Javascript, ReactJS, MongoDB, REST API, NodeJS, and ExpressJS
                        </p>


                        <h3 className='text-2xl mt-4'>FAMILIAR TO</h3>

                        <p className='my-1'>Recharts, Axios, Azure and WordPress
                        </p>

                        <h3 className='text-2xl mt-4 mb-1'>BEST LIVE WEBSITE LINK</h3>

                        <p><a target={`_blank`} href="https://warehouse-management-e55db.web.app/">Fruits Warehouse</a></p>
                        <p><a target={`_blank`} href="https://independent-service-prov-1f0bd.web.app/">Healer</a></p>
                        <p><a target={`_blank`} href="https://code-man.netlify.app/">Code Man</a></p>
                    </div>
                </div>



            </div>

        </div >
    );
};

export default Portfolio;