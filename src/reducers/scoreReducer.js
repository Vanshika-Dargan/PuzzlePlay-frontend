import {createSlice} from '@reduxjs/toolkit'

export const scoreReducer = createSlice({
    name:'scoreReducer',
    initialState:{
        value:0,
    },
    reducers:
    {
    updateScore:(state,action)=>
    {
        state.value=state.value+action.payload
    },
    }})

    export const{updateScore}=scoreReducer.actions
    export default scoreReducer.reducer
