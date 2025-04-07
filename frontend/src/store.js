import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from './shipments/shipmentSlice'
export const store =  configureStore({
    reducer:{
       shipment:shipmentReducer,
    }
})