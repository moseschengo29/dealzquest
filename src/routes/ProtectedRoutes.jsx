import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const {user} = useAuth()
    // console.log(user)

    const navigate = useNavigate();

    useEffect(
        function () {
    
          if (!user) navigate("/signin");
        },
        [user, navigate]
      );
    
 
    return(
        user ? <Outlet /> :  <Navigate to='/signin' />
    )    

}

export default ProtectedRoutes;