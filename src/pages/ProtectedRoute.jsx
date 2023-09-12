import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const checkUserToken = () => {
    //     const userToken = localStorage.getItem('user-token');
    //     if (!userToken || userToken === 'undefined') {
    //         setIsLoggedIn(false);
    //         return navigate('/signin');
    //     }
    //     setIsLoggedIn(true);
    //     // navigate("/user")
    // }
    useEffect(() => {
            // checkUserToken();
            console.log("LOG")
        }, [isLoggedIn]);
    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
        </>
    );
}
export default ProtectedRoute;