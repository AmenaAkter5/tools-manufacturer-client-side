import React from 'react';
import { useParams } from 'react-router-dom';



const Purchase = () => {

    // get dynamic parameter of route
    const { id } = useParams();

    return (
        <div>
            <h1>This is Purchase for {id}</h1>
        </div>
    );
};

export default Purchase;