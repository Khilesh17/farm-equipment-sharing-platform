import React from 'react'
import MainContianer from '../components/core/HomePage/MainContianer'
import CategoryOfEquipment from '../components/core/HomePage/CategoryOfEquipment';
import CardContainer from '../components/core/HomePage/CardContainer';
import AboutFeatures from '../components/core/HomePage/AboutFeatures';
import ReviewsSection from '../components/core/HomePage/reviewSection/ReviewsSection';
import Footer from '../components/common/Footer';

const Home = () => {
    return (
        <div className='px-4 lg:px-0 pt-8'>
            <MainContianer />
            <CategoryOfEquipment />
            <CardContainer />
            <AboutFeatures />
            <ReviewsSection />
            <Footer />
        </div>
    )
}

export default Home