import React from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const PrivateRoute = () => {

   

const isLogin = async() => {
    const response = await axios.get('/get_user/')
    if(response.data.length !== 0) {
        setAuth(true)
    } else {
        console.log('fail')
        return false
    }
}
 const [auth, setAuth] = useState(true)

 isLogin()

    return (
        auth ? <Outlet/>: <Navigate to="/login" />
    )
};

export default PrivateRoute;