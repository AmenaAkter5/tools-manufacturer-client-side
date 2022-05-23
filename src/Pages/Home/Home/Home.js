import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Banner from '../Banner/Banner';
import Reviews from '../Reviews/Reviews';
import Summary from '../Summary/Summary';
import Tools from '../Tools/Tools';


const Home = () => {
    return (
        <main>
            <Banner></Banner>
            <Tools></Tools>
            <Summary></Summary>
            <Reviews></Reviews>
            <Footer></Footer>
            {/* extra 2 ta section */}
        </main>
    );
};

export default Home;