import { createSlice } from "@reduxjs/toolkit";


const equipmentSlice = createSlice({
    name: "equipments",
    initialState: {
        rentedEquipments: [],
        myEquipments: [],
    },
    reducers: {
        setRentedEquipments: (state, action) => {
            state.rentedEquipments = action.payload;
        },
        setMyEquipments: (state, action) => {
            state.myEquipments = action.payload;
        }
    }
});

export const { setRentedEquipments, setMyEquipments } = equipmentSlice.actions;

export default equipmentSlice.reducer;