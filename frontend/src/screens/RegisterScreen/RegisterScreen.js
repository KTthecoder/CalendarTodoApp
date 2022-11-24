import React from 'react'
import './RegisterScreen.css'
import { Link } from 'react-router-dom'

const RegisterScreen = () => {
  return (
    <div className='LoginContainer'>
        {/* <div className='LoginDivBanner'></div> */}
        <div className='LoginContainer1'>
            <div className='LoginContainer2'>
                <form className='LoginDiv'>
                    <div className='LoginDivHeader'>
                        <h1>Create New Account!</h1>
                    </div>
                    <div className='LoginInpDiv'>
                        <p>Username</p>
                        <input type='text' className='LoginInp' placeholder='Username' />
                    </div>
                    <div className='LoginInpDiv'>
                        <p>Email</p>
                        <input type='text' className='LoginInp' placeholder='Password' />
                    </div>
                    <div className='LoginInpDiv'>
                        <p>Password</p>
                        <input type='password' className='LoginInp' placeholder='Password' />
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