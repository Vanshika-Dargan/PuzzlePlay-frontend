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
    resetTime:(state)=>
    {
        state.value=0;
    }
    }})

    export const{updateTime,resetTime}=gameReducer.actions
    export default gameReducer.reducer

