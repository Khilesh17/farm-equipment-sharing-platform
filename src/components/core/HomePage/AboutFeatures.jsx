import React from 'react'
import FeaturesGrid from './FeaturesGrid'
import { useNavigate } from 'react-router-dom'

const AboutFeatures = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full lg:w-10/12 mx-auto'>
            <div className='py-28 px-0 md:px-8'>
                <div>
                    <h1 className='font-bold text-xl text-richblack-700'>There's more</h1>
                    <h2 className='text-richblack-600 text-xl'>to renting</h2>
                    <div className='mt-2 w-12 h-1 bg-red-400'></div>
                </div>

                <div className='mt-8'>
                    <FeaturesGrid /> 
                </div>

                <button
                    className='mt-8 text-light-blue-400 font-bold'
                    onClick={()=>navigate("/about-us")}
                >
                    KNOW MORE
                </button>
            </div>
        </div>
    )
}

export default AboutFeatures