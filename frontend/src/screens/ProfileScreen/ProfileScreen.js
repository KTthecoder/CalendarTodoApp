import React, { useContext } from 'react'
import NavbarMain from '../../components/navigation/NavbarMain'
import { AuthContext } from '../../contexts/AuthProvider'
import './ProfileScreen.css'

const ProfileScreen = () => {
    const { loginUser } = useContext(AuthContext)

    return (
        <div className='ProfileContainer'>
            <NavbarMain/>
        </div>
    )
}

export default ProfileScreen