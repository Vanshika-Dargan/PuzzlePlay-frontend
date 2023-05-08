import {createSlice} from '@reduxjs/toolkit'

export const gameReducer = createSlice({
    name:'gameReducer',
    initialState:{
        value:0,
    },
    reducers:
    {
    updateTime:(state,action)=>
    {
        state.value=state.value+action.payload
    },
    }})

    export const{updateTime}=gameReducer.actions
    export default gameReducer.reducer
