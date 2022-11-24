import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = (props) => {
    let [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null)
    let [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) : null )
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value
            })
        })
        let data = await response.json()
        if(response.status == 200){
            setRefreshToken(data.refresh)
            setAccessToken(data.access)
            setUser(jwt_decode(data.access))
            localStorage.setItem('refreshToken', JSON.stringify(data.refresh))
            localStorage.setItem('accessToken', JSON.stringify(data.access))
            navigate("/")
        }
        else{
            alert("Something went wrong")
        }
    }

    let logoutUser = () => {
        setUser(null)
        setRefreshToken(null)
        setAccessToken(null)
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'refresh' : refreshToken
            })
        })
        let data = await response.json()

        if(response.status == 200){
            setAccessToken(data.access)
            setUser(jwt_decode(data.access))
            localStorage.setItem('accessToken', JSON.stringify(data.access))
        }
        else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        refreshToken: refreshToken,
        accessToken: accessToken
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4 
        let interval = setInterval(() => {
            if(accessToken){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [accessToken, refreshToken, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider