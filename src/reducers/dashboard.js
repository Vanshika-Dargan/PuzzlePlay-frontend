


  export default (state={dashboardData:[]}, action) => {
    switch (action.type) {
      case 'FETCH_GAMEPLAY_DATA_SUCCESS':
        return {
          ...state,
          dashboardData: action.payload
        };
        case 'ADD_GAMEPLAY_DATA_SUCCESS':
      return {
        ...state,dashboardData:[...state.dashboardData, action.payload]
      }
      default:
        return state;
    }
    
  };
  
  