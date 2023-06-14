import React, { useContext } from 'react'
import NavbarMain from '../../components/navigation/NavbarMain'
import { AuthContext } from '../../contexts/AuthProvider'
import './ProfileScreen.css'

const ProfileScreen = () => {
    const { logoutUser } = useContext(AuthContext)

    return (
        <div className='ProfileContainer'>
            <NavbarMain/>
            <div className='ProfileContainer1'>
                <button className='ProfileLogoutBtn' onClick={() => logoutUser()}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileScreen