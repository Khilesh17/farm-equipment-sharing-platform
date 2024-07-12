import React, { useEffect } from 'react'
import { getMyEquipments } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setMyEquipments } from '../../../../redux/slices/equipmentSlice';

const MyEquipments = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const myEquipments = useSelector(state => state.equipments.myEquipments);

  const getMyEquipment = async () => {
    try {
      const result = await getMyEquipments(token);
      dispatch(setMyEquipments(result));
    }
    catch (error) {
      console.log("Could not fetch My Equipments.")
    }
  };

  useEffect(() => {
    getMyEquipment();
  }, [])

  if (myEquipments.length === 0) {
    return (
      <div className='w-full pt-24 text-3xl font-montserrat flex justify-center items-center'>
        No Equipment is Uploaded By You.
      </div>
    )
  }

  return (
    <div>MyEquipments</div>
  )
}

export default MyEquipments