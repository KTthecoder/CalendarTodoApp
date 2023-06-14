import React, { useContext, useEffect, useState } from 'react'
import './NavbarMain.css'
import menuIcon from '../../static/icons/menu.png'
import homeIcon from '../../static/icons/home.png'
import calendarIcon from '../../static/icons/calendar.png'
import todayIcon from '../../static/icons/today.png'
import userIcon from '../../static/icons/user.png'
import { NavLink, useLocation, useParams, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'

const NavbarMain1 = () => {

    const { year, month, day } = useParams()
    const location = useLocation()
    const [ yearState, setYearState ] = useState(0)
    const [ monthState, setMonthState ] = useState(0)
    const [ dayState, setDayState ] = useState(0)
    const navigation = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if(day == undefined){
            var date = new Date()
            setDayState(date.getDate())
        }
        else{
            setDayState(day)
        }

        if(year == undefined || month == undefined){
            var date = new Date()
            setMonthState(date.getUTCMonth() + 1)
            setYearState(date.getUTCFullYear())
        }
        else{
            setMonthState(month)
            setYearState(year)
        }
        console.log(user)
    }, [location])

    return (
        <div className='NavbarMainContainer'>
            <div className='NavbarMainContainer1'>
                <div className='NavbarMainHeader'>
                    <div className='NavbarMainHeaderLeft'>
                        <img src={menuIcon} className='NavbarMainHeaderLeftIcon' alt='Menu Icon'/>
                        {/* <a href="https://www.flaticon.com/free-icons/open-menu" title="open menu icons">Open menu icons created by bqlqn - Flaticon</a> */}
                    </div>
                    <div className='NavbarMainHeaderMin'>
                        <h1>CalendarApp</h1>
                    </div>
                    <div className='NavbarMainHeaderRight'>
                        <div className='NavbarMainHeaderRight1'>
                            <img src={userIcon} className='NavbarMainHeaderRightIcon' alt='Profile Image'/>
                            {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
                            <p onClick={() => navigation('/profile')}>{user.username}</p>
                        </div>
                    </div>
                </div>
                <div className='NavbarMainMid'>
                    <NavLink to='/home' className={({isActive}) => (isActive ? 'NavbarMainMidLink' : 'NavbarMainMidLink1')}>
                        <img src={homeIcon} className='NavbarMainMidLinkIcon' alt='Home Icon' />
                        <p>Home</p>
                    </NavLink>
                    <NavLink to={`/calendar/tasks/${yearState}-${monthState}-${dayState}`} className={({isActive}) => (isActive ? 'NavbarMainMidLink' : 'NavbarMainMidLink1')}>
                        <img src={todayIcon} className='NavbarMainMidLinkIcon' alt='Home Icon' />
                        <p>Today</p>
                    </NavLink>
                    <NavLink to={`/calendar/${yearState}/${monthState}`} className={({isActive}) => (isActive ? 'NavbarMainMidLink' : 'NavbarMainMidLink1')}>
                        <img src={calendarIcon} className='NavbarMainMidLinkIcon' alt='Home Icon' />
                        <p>Calendar</p>
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default NavbarMain1