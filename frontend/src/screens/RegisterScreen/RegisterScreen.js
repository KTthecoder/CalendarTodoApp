import React, { useContext, useState } from 'react'
import './RegisterScreen.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'
import GetCookie from '../../components/GetCookie'

const RegisterScreen = () => {

    const [ username, setUsername ] = useState()
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()

    const navigation = useNavigate()

    // const RegisterUser = () => {
    //     const csrftoken = GetCookie('csrftoken');
    //     fetch('http://127.0.0.1:8000/api/register', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrftoken,
    //         },
    //         body: JSON.stringify({
    //             username: username,    
    //             password: password,
    //             email: email,
    //         })
    //     })
    //     .then(res => res.json())
    //     .then((data) => {
    //         navigation('/login')
    //     })
    //     .catch(err => {
    //         alert(err.message)
    //     }) 
        
    // }

    const RegisterUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,    
                password: password,
                email: email,
            })
        })
        let data = await response.json()
        if(response.status == 200){
            navigation('/login')
        }
        else{
            alert("Something went wrong")
        }
    }

    return (
        <div className='LoginContainer'>
            {/* <div className='LoginDivBanner'></div> */}
            <div className='LoginContainer1'>
                <div className='LoginContainer2'>
                    <form className='LoginDiv' onSubmit={RegisterUser} encType='multipart/form-data'>
                        <div className='LoginDivHeader'>
                            <h1>Create New Account!</h1>
                        </div>
                        <div className='LoginInpDiv'>
                            <p>Username</p>
                            <input type='text' className='LoginInp' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                        </div>
                        <div className='LoginInpDiv'>
                            <p>Email</p>
                            <input type='text' className='LoginInp' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                        </div>
                        <div className='LoginInpDiv'>
                            <p>Password</p>
                            <input type='password' className='LoginInp' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                        </div>
                        <div className='LoginBtnDiv'>
                            <button type='submit'>Register</button>
                        </div>
                        <div className='LoginDivInfo'>
                            <p>Have a account?</p>
                            <Link to='/login' className='LoginDivInfoLink'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen