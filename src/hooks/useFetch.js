import { useEffect, useCallback, useReducer } from "react";
import { SET_DATA, SET_ERROR } from "../actions/fetch";
import {API} from "../API/API";
import { fetchReducer, initialState } from "../reducers/fetch";

export const useFetch = (endpoint = "", req={}) => {
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

    const postData = useCallback(async () => {
        try {
            const response = await API.post(`${endpoint}`, req);
            console.log(response.data);
            dispatch({type: SET_DATA, payload: response.data})
        } catch (e) {
            dispatch({type: SET_ERROR});
            console.log(e);
        }
    }, [endpoint, req]);

    useEffect(() => {
        getData();
    }, [endpoint, getData]);
    
    useEffect(() => {
        postData();
    }, [endpoint, postData])

    return state;
}