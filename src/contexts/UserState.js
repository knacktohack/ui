import { useState } from "react";
import { userData } from "../UserData";
import userContext from "./UserContext";


const UserState = (props)=>{

   
    const [user,setUser] = useState(userData[0])

    return (
        <userContext.Provider value={{user,setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;