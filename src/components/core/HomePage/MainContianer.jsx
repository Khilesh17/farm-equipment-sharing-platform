import React from 'react'
import FARMER_IMG from "../../../assets/mainContainerBg.jpg";
import Button from '../../common/Button';

const MainContianer = () => {

    const rentNowHandler = () => {
        console.log("Rent Now Button Clicked");
    }

    return (
        <div className='w-full lg:w-10/12 mx-auto '>
            <div className='flex'>
                <div className='bg-green-400 w-4/12 rounded-l-3xl flex justify-end items-center'>
                    <div className='w-5/6 h-3/4 rounded-s-3xl bg-white flex flex-col justify-center items-center px-2 lg:px-4'>
                        <p className='text-green-300 text-4xl lg:text-5xl font-caveat text-center'>FarmShare</p>
                        <p className='font-caveat text-3xl lg:text-4xl text-richblack-600 text-center'>Rent Farm Equipments</p>
                        <p className='font-caveat text-green-200 text-3xl lg:text-5xl text-center'>And Advance Your Farming</p>

                        <div className='pt-2 lg:pt-4'>
                            <Button
                                text={"Rent Now"}
                                onClickHandler={rentNowHandler}
                            />
                        </div>
                    </div>
                </div>
                <img
                    className='w-8/12 rounded-r-3xl'
                    src={FARMER_IMG}
                    alt="main-container-logo"
                />
            </div>
        </div>
    )
}

export default MainContianer