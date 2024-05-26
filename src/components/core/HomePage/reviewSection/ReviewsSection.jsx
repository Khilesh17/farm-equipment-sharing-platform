import React from 'react'
import ReviewSlider from './ReviewSlider'

const ReviewsSection = () => {
    return (
        <div className='w-full lg:w-10/12 mx-auto'>
            <div className='flex gap-24 px-0 md:px-8 py-16'>
                <div className='w-1/6'>
                    <h1 className='font-bold text-richblue-700 text-2xl'>Over 1.5 lac</h1>
                    <p className='text-richblue-400 text-2xl'>happy subscribers</p>

                    <div className='mt-2 w-12 h-1 bg-red-400'></div>

                    <p className='text-xl text-richblue-300 pt-10'>Here's what they have to say about their Farmshare experience.</p>
                </div>

                <ReviewSlider />
            </div>
        </div>
    )
}

export default ReviewsSection