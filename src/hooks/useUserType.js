import { useContext } from "react"
import { UserTypeContext } from "../contexts/userType"

export const useUserType = () => {
    const context = useContext(UserTypeContext);
    if (!context) throw new Error("useUserType must be wrapped within UserTypeProvider");
    return context
}