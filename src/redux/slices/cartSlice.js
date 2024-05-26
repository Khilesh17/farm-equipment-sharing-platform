import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            : [],
        totalPrice: localStorage.getItem("totalPrice")
            ? JSON.parse(localStorage.getItem("totalPrice"))
            : 0,
        totalItems: localStorage.getItem("totalItems")
            ? JSON.parse(localStorage.getItem("totalItems"))
            : 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const equipment = action.payload;

            // Firstly we have to check the item is already present or not
            const index = state.cart.findIndex(item => item._id === equipment._id);

            if (index >= 0) {
                toast.error("Equipment already in cart");
                return;
            }

            // If not in the cart then push it
            state.cart.push(equipment);
            state.totalItems++;
            state.totalPrice += equipment.price;

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Equipment added to cart");
        },
        removeToCart: (state, action) => {
            const equipmentId = action.payload
            const index = state.cart.findIndex((item) => item._id === equipmentId);

            if (index >= 0) {
                state.totalItems--;
                state.totalPrice -= state.cart[index].price;
                state.cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Equipment Removed from the cart");
            }


        },
        resetCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
            state.totalItems = 0;

            // Also Update the Local Storage
            localStorage.removeItem('cart');
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('totalItems');
        }
    }
})


export const { addToCart, removeToCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;