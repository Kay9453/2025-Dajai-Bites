import { useEffect, useState } from "react";

import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";   //  監聽登入狀態
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

// 建一個 Provider 元件，for 監聽 firebase 登入狀態
export const UserProvider = ({children}) =>{

  const [user, setUser] = useState(null);  //登入狀態
  
  // 監聽 Firebase 登入狀態
  useEffect(()=>{
    const loginStatus = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
    })
    // 清除監聽
    return () => loginStatus();
  },[user]);

  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};