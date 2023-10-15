import { GET_TYPE, SET_TYPE } from "../actions/userType";

export const initialState = {
    userType: ""
}

export const userTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPE:
            return state;
        
        case SET_TYPE:
            return {
                ...initialState,
                userType: action.payload
            }
            

        default:
            return state;
    }
}