import React from 'react'
import footerData from '../../../data/footerData'
import { useNavigate } from 'react-router-dom';
import FooterLinks from './FooterLinks';
import ButtonRed from '../ButtonRed';

const Footer = () => {

    const navigate = useNavigate();
    const { heading, description1, description2, description3 } = footerData[0];
    const linksData = footerData[1].data;

    return (
        <div className='bg-gray-300 mt-10'>
            <div className='w-full lg:w-10/12 mx-auto'>

                {/* Descriptions  */}
                <div className='pt-28'>
                    <h1 className='font-bold text-xl text-richblack-600'>
                        {heading}
                    </h1>
                    <div className='pt-4 text-richblack-400'>
                        <p>
                            {description1}
                        </p>
                        <p>
                            {description2}
                        </p>
                        <p>
                            {description3}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/about-us")}
                        className='mt-6 text-richblack-500 font-semibold'
                    >
                        Read More
                    </button>
                </div>


                {/* Links */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center sm:text-left'>
                    {
                        linksData.map(data => (
                            <FooterLinks
                                key={data.id}
                                data={data}
                            />
                        ))
                    }

                    <div className='py-16'>
                        <h1 className='font-bold text-xl text-richblack-600'>NEED HELP ?</h1>
                        <p className='text-richblack-400 ml-10 mt-3'>support@farmshare.com</p>
                        <p className='mt-6 font-bold text-richblack-700'>DOWNLOAD APP</p>
                        <div className='flex mt-4 gap-4'>
                            <ButtonRed
                                text={"Google Play"}
                            />
                            <ButtonRed
                                text={"App Store"}
                            />
                        </div>
                    </div>
                </div>

                {/* Copyrights  */}
                <div className='py-6 text-richblack-500'>
                    <p>&copy; {new Date().getFullYear()} Farm Equipment Sharing Platform. All rights reserved by <span className='text-red-400'>Khilesh</span>. </p>
                </div>
            </div>
        </div>
    )
}

export default Footer