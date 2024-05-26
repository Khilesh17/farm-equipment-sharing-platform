import React from 'react'
import ButtonRed from './ButtonRed';
import { useNavigate } from 'react-router-dom';

const Card = ({ cardInfo }) => {

  const navigate = useNavigate();
  const noOfLetters = 60;

  const {
    id, image, price, description, name
  } = cardInfo;

  return (
    <div className='bg-white px-2 py-4'>
      <div>
        <img
          className='w-full'
          src={image}
          alt="equipment-img"
        />

        <div className='pt-4'>
          <h1 className='font-bold text-richblack-600'>{name}</h1>
          <p className='text-richblue-400 text-sm pt-2'>
            {
              description.length > noOfLetters
                ? description.slice(0, noOfLetters) + "..."
                : description
            }
          </p>
          <div className='flex justify-between items-center pt-3'>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300'>Rent</p>
              <p className='font-bold text-richblack-700'>₹ {price}</p>
            </div>
            <ButtonRed
              text="See More"
              onClickHandler={() => navigate(`/equipment/${id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card