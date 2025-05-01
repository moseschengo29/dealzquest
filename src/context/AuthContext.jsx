import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useLogout } from "../features/auth/useLogout";
import { setTokensInCookies } from "../features/auth/authCookies";

const AuthContext = createContext();

function AuthProvider ({children}) {
    const baseUrl = import.meta.env.VITE_API_URL;

    const {logout} = useLogout()
    const [isLoading, setisLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [currentUser, setCurrentUser] = useState(()=> localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')) : null)



    const navigate = useNavigate();

    const signin = async (formData) => {
        try {
            setisLoading(true);
    
            const response = await fetch(`${baseUrl}/api/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': formData.username,
                    'password': formData.password
                })
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                console.log('ok')
                    setisLoading(false);
                    console.log(data);    
        
                    setTokensInCookies(data["token"], data["refresh"]);
                    localStorage.setItem('authTokens', JSON.stringify(data));
        
                    // Destructure the data object to exclude refresh and access tokens
                    console.log(data)
                    const { user} = data;
                    console.log(user)
                    localStorage.setItem('current_user', JSON.stringify(user));
                    setCurrentUser(user) 
                    setUser(user)                           
            
                    navigate('/');
                
            } else {
                setisLoading(false);
                toast.error('Something went wrong. Make sure login credentials are right.');
            }
        } catch (err) {
            // toast.error(err);
            setisLoading(false);
        } finally {
            setisLoading(false);
        }
    };



    // const updateToken = async () => {
    //     const response = await fetch(`${baseUrl}/api/v1/token/refresh`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({'refresh': authTokens?.access})
    //     });

    //     const data = await response.json();

    //     if (response.status === 200) {
    //         setTokensInCookies(data["access"], data["refresh"]);

    //         setAuthTokens(data);
    //         setUser(jwtDecode(data?.access));
    //         // console.log(user)
    //         localStorage.setItem('authTokens', JSON.stringify(data));
    //         setUserName(data?.name);
    
    //     } else {
    //         logoutUser();
    //     }
    //     if (isLoading) {
    //         setisLoading(false);
    //     }
    // };

    function logoutuser (){
        logout()
        setCurrentUser(null)
    }

    async function register (formData) {
        try {
            setIsRegistering(true)
    
            const response = await fetch(`${baseUrl}/api/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': formData.username,
                    'password': formData.password,
                    'email': formData.email
                })
            });
    
            const data = await response.json();
    
            if (response.status === 201) {
                    setIsRegistering(false);
        
                    setTokensInCookies(data["token"], data["refresh"]);
                    localStorage.setItem('authTokens', JSON.stringify(data));
        
                    // Destructure the data object to exclude refresh and access tokens
                    const { user} = data;
                    console.log(user)
                    localStorage.setItem('current_user', JSON.stringify(user));
                    setCurrentUser(user)                            
            
                    navigate('/');
                
            } else {
                setisLoading(false);
                toast.error('Something went wrong. Make sure login credentials are right.');
            }
        } catch (err) {
            // toast.error(err);
            setIsRegistering(false);
        } finally {
            setIsRegistering(false);
        }
    }

    
    useEffect(()=> {
        let oneHour = 1000 * 60 * 60 * 3

        let interval =  setInterval(()=> {
            if(authTokens){
                toast.error('Session has expired, sign in again')
                logout()
            }
        }, oneHour)
        return ()=> clearInterval(interval)

    }, [])

    



    const contextData = {
        isLoading: isLoading,
        user: user,
        signin: signin,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        currentUser: currentUser,
        logoutuser: logoutuser,
        register: register,
        isRegistering: isRegistering
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error("Auth context was used outside auth provider");
  
    return context;
}

export { AuthProvider, useAuth };
