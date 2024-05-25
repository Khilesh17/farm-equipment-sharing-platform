import React from 'react'
import MainContianer from '../components/core/HomePage/MainContianer'
import CategoryOfEquipment from '../components/core/HomePage/CategoryOfEquipment';
import CardContainer from '../components/core/HomePage/CardContainer';

const Home = () => {
    return (
        <div className='px-4 lg:px-0 pt-8'>
            <MainContianer />
            <CategoryOfEquipment />
            <CardContainer />
        </div>
    )
}

export default Home