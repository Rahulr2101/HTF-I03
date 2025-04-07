import {createSlice} from '@reduxjs/toolkit'

const shipmentSlice = createSlice({
    name:'shipment',
    initialState:[],
    reducers:{
        addCargo(state,actions){
            state.push({
                id:actions.payload.id,
                name:actions.payload.name
            })
        }
    }

})

export const {addCargo} = shipmentSlice.actions
export default shipmentSlice.reducer