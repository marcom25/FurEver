import { useEffect, useCallback, useReducer } from "react";
import { SET_DATA, SET_ERROR } from "../actions/fetch";
import {API} from "../API/API";
import { fetchReducer, initialState } from "../reducers/fetch";

export const useFetch = (endpoint = "", deps = []) => {
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    

    const getData = useCallback(async () => {
        try {
            const {data} = await API.get(`${endpoint}`);
            dispatch({ type: SET_DATA, payload: data})
        } catch (e) {
            dispatch({type: SET_ERROR});
            console.log(e);
        }
    }, [endpoint]);

    useEffect(() => {
        getData();
    }, [endpoint, getData, ...deps]);
    
 

    return state;
}