import {ACTIONS} from "../actions/fetch";

export const initialState = {
    loading: true,
    error: false,
    data: [],
}

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTIONS.SET_DATA:
            return {
                ...initialState,
                loading: false,
                data: action.payload,
            }
        case ACTIONS.SET_ERROR:
            return {
                ...initialState,
                loading: false,
                error: true,
            }
        case ACTIONS.SET_LOADING:
            return {
                ...initialState,
                loading: true,
            }
        default:
            return state;
    }
}