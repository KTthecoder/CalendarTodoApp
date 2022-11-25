import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CalendarScreen from '../../screens/CalendarScreen/CalendarScreen'
import CreateActivityScreen from '../../screens/CreateActivityScreen/CreateActivityScreen'
import DateDetails from '../../screens/DateDetails/DateDetails'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import LoginScreen from '../../screens/LoginScreen/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen'
import StatsScreen from '../../screens/StatsScreen/StatsScreen'
import TodayScreen from '../../screens/TodayScreen/TodayScreen'
import PrivateRoute from '../../utils/PrivateRoute'

const Navigation = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
          {/* Without Authentication*/}
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />

          {/* User need to be logged In */}
          <Route exact path='/calendar/:year/:month' element={<PrivateRoute/>}>
            <Route path='/calendar/:year/:month' element={<CalendarScreen/>} />
          </Route>
          <Route exact path='/calendar/tasks/:year-:month-:day' element={<PrivateRoute/>}>
            <Route path='/calendar/tasks/:year-:month-:day' element={<DateDetails/>} />
          </Route>
          <Route exact path='/today' element={<PrivateRoute/>}>
            <Route path='/today' element={<TodayScreen/>} />
          </Route>
          <Route exact path='/stats' element={<PrivateRoute/>}>
            <Route path='/stats' element={<StatsScreen/>} />
          </Route>
          <Route exact path='/home' element={<PrivateRoute/>}>
            <Route path='/home' element={<HomeScreen/>} />
          </Route>
          <Route exact path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile' element={<ProfileScreen/>} />
          </Route>
      </Routes>
      {background && (
        <Routes>
          <Route exact path='/calendar/create/:year-:month-:day' element={<PrivateRoute/>}>
            <Route path='/calendar/create/:year-:month-:day' element={<CreateActivityScreen/>} />
          </Route>
        </Routes>
      )}
    </>
    
  )
}

export default Navigation