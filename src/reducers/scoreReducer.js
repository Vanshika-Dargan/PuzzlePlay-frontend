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
    resetScore:(state)=>
    {
        state.value=0;
    }
    }})

    export const{updateScore,resetScore}=scoreReducer.actions
    export default scoreReducer.reducer
