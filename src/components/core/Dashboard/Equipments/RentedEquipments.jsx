import React, { useEffect } from 'react'
import { getRentedEquipments } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setRentedEquipments } from '../../../../redux/slices/equipmentSlice';

const RentedEquipments = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const rentedEquipments = useSelector(state => state.equipments.rentedEquipments);
  
  const getRentedEquipment = async () => {
    try {
      const result = await getRentedEquipments(token);
      dispatch(setRentedEquipments(result));
    }
    catch (error) {
      console.log("Could not fetch Rented Equipments.")
    }
  };

  useEffect(() => {
    getRentedEquipment();
  }, [])

  if (rentedEquipments.length === 0) {
    return (
      <div className='w-full pt-24 text-3xl font-montserrat flex justify-center items-center'>
        No Equipment is Rented By You.
      </div>
    )
  }

  return (
    <div>
      <div>
        My equipments
      </div>
    </div>
  )
}

export default RentedEquipments