import React from 'react';
import useTools from '../../../hooks/useTools';
import Tool from './Tool';


const Tools = () => {

    const { tools } = useTools();

    return (
        <div className='my-28'>
            <div className='text-center'>
                <h1 className='text-secondary text-xl font-bold uppercase'>Our Services</h1>
                <h1 className='text-4xl'>Services We Provide</h1>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    tools.map(tool => <Tool
                        key={tool._id}
                        tool={tool}
                    ></Tool>)
                }
            </div>
            {/* <div className="hero min-h-screen flex justify-center mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={treatment} className="max-w-sm rounded-lg shadow-2xl" alt='special service' />
                    <div className='p-10'>
                        <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Tools;