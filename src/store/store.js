import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

const store = configureStore({
    reducer:{
        cart: cartSlice,
        products: productSlice, //property name=cart
    }
});

export default store;