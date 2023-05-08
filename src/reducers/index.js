import { combineReducers } from "redux";
import auth from './auth'
import dashboard from './dashboard'
import gameReducer from './gameReducer'
import scoreReducer from "./scoreReducer";
export const reducers= combineReducers({auth,dashboard,gameReducer,scoreReducer})