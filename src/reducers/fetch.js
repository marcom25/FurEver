import { SET_DATA, SET_ERROR, SET_LOADING } from "../actions/fetch";

export const initialState = {
  loading: true,
  error: false,
  data: [],
};

export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...initialState,
        loading: false,
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
