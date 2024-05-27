import React from 'react'
import { Link } from 'react-router-dom';

const FooterLinks = ({ data }) => {

    const { name, links } = data;

    return (
        <div className='py-16'>
            <h1 className='font-bold text-richblack-700'>{name}</h1>

            <div className='flex flex-col text-richblack-400 gap-4 mt-4'>
                {
                    links.map(link => (
                        <Link
                            to={link.path}
                            key={link.id}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default FooterLinks