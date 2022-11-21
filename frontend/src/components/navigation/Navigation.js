import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CalendarScreen from '../../screens/CalendarScreen/CalendarScreen'
import DateDetails from '../../screens/DateDetails/DateDetails'
import LoginScreen from '../../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen'

const Navigation = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/calendar/:year/:month' element={<CalendarScreen/>} />
        <Route path='/calendar/tasks/:year-:month-:day' element={<DateDetails/>} />
    </Routes>
  )
}

export default Navigation