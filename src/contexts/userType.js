import { createContext, useReducer } from "react";
import { GET_TYPE, SET_TYPE } from "../actions/userType";
import { initialState, userTypeReducer } from "../reducers/userType";

export const UserTypeContext = createContext();
const {Provider} = UserTypeContext;

export const UserTypeProvider = ({children}) => {
    const [state, dispatch] = useReducer(userTypeReducer, initialState);

    const userType = state.userType;

    const getUserType = () => {
        dispatch({
            type: GET_TYPE
        })
    }

    const setUserType = (type) => {
        dispatch({
            type: SET_TYPE,
            payload: type
        })
    }

    return (
        <Provider value={{userType, getUserType, setUserType}}>
            {children}
        </Provider>
    )
}