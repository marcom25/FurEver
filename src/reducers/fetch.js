import { SET_DATA, SET_ERROR, SET_LOADING, TRIGGER_FETCH } from "../actions/fetch";

export const initialState = {
  loading: true,
  error: false,
  triggerFetch: false,
  data: [],
};

export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...initialState,
        loading: false,
        triggerFetch: true,
        data: action.payload,
      };
    case SET_ERROR:
      return {
        ...initialState,
        loading: false,
        error: true,
      };
    case SET_LOADING:
      return {
        ...initialState,
        loading: true,
      };
    
    default:
      return state;
  }
};
