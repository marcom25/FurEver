import { useEffect, useCallback, useReducer } from "react";
import { SET_DATA, SET_ERROR } from "../actions/fetch";
import {API} from "../API/API";
import { fetchReducer, initialState } from "../reducers/fetch";

export const usePost = (endpoint = "", req={}) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    
    const postData = useCallback(async () => {
        try {
            const response = await API.post(`${endpoint}`, req);
            console.log(response.data);
            dispatch({type: SET_DATA, payload: response.data})
        } catch (e) {
            dispatch({type: SET_ERROR});
            console.log(e);
        }
    }, [endpoint, ]);

    
    useEffect(() => {
        postData();
    }, [endpoint, postData])

    return state;
}