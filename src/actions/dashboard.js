import * as api from '../api/index.js';

export const FETCH_GAMEPLAY_DATA_REQUEST = 'FETCH_GAMEPLAY_DATA_REQUEST';
export const FETCH_GAMEPLAY_DATA_SUCCESS = 'FETCH_GAMEPLAY_DATA_SUCCESS';
export const FETCH_GAMEPLAY_DATA_FAILURE = 'FETCH_GAMEPLAY_DATA_FAILURE';

export const getDashboardData = () => async (dispatch) => {
  
  try {
    const { data } = await api.getDashboardData();
    console.log(data);
    dispatch({ type: FETCH_GAMEPLAY_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const ADD_GAMEPLAY_DATA_REQUEST = 'ADD_GAMEPLAY_DATA_REQUEST';
export const ADD_GAMEPLAY_DATA_SUCCESS = 'ADD_GAMEPLAY_DATA_SUCCESS';
export const ADD_GAMEPLAY_DATA_FAILURE = 'ADD_GAMEPLAY_DATA_FAILURE';

export const addDashboardData = (userData) => async (dispatch) => {
  
  try {
    const {data} = await api.addDashboardData(userData);
   console.log(data);
    dispatch({ type: ADD_GAMEPLAY_DATA_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

