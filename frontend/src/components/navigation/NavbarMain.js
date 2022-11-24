import React, { useEffect, useState } from 'react'
import './NavbarMain.css'
import menuIcon from '../../static/icons/menu.png'
import homeIcon from '../../static/icons/home.png'
import calendarIcon from '../../static/icons/calendar.png'
import statsIcon from '../../static/icons/stats.png'
import todayIcon from '../../static/icons/today.png'
import reactLogoIcon from '../../static/imgs/reactLogo.png'
import { NavLink, useLocation, useParams } from 'react-router-dom'

const NavbarMain1 = () => {

    const { year, month, day } = useParams()
    const location = useLocation()
    const [ yearState, setYearState ] = useState(0)
    const [ monthState, setMonthState ] = useState(0)
    const [ dayState, setDayState ] = useState(0)

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
            setMonthState(date.getUTCMonth() + 2)
            setYearState(date.getUTCFullYear())
        }
        else{
            setMonthState(month)
            setYearState(year)
        }
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
                            <img src={reactLogoIcon} className='NavbarMainHeaderRightIcon' alt='Profile Image'/>
                            <p>Username2115</p>
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
                    <NavLink to='/stats' className={({isActive}) => (isActive ? 'NavbarMainMidLink' : 'NavbarMainMidLink1')}>
                        <img src={statsIcon} className='NavbarMainMidLinkIcon' alt='Home Icon' />
                        <p>Stats</p>
                    </NavLink>
                </div>
            </div>
            
        </div>
    )
}

export default NavbarMain1