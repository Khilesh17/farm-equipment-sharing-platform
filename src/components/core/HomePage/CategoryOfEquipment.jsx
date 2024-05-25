import React from 'react'
import { Link } from 'react-router-dom';
import cardsData from '../../../data/categoryOfEquipments';

const CategoryOfEquipment = () => {


  return (
    <div className='w-full lg:w-10/12 mx-auto '>
      <div className='mt-6'>
        <h1 className='font-bold text-2xl text-center'>Rent Farming Tools and Equipments</h1>
        <div className='flex gap-3 mt-4 justify-between'>
          {
            cardsData.map(card => (
              <Link
                key={card.id}
                to={`/category/${card.to}`}
              >
                <img
                  src={card.path}
                  alt="category"
                />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryOfEquipment