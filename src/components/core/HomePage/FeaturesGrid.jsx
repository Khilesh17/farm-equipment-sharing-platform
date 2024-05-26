import React from 'react'
import featuresData from '../../../data/featuresData';


const FeaturesGrid = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
                featuresData.map(info => (
                    <div className=''>
                        <img src={info.image} alt={info.name} />
                        <h1 className='mt-4 text-richblack-700 font-bold'>{info.name}</h1>
                        <p className='mt-2 text-richblack-400'>{info.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default FeaturesGrid