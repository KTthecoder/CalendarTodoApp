import React from 'react'
import { Routes, Route, useLocation, Navigate  } from 'react-router-dom'
import CalendarScreen from '../../screens/CalendarScreen/CalendarScreen'
import CreateActivityScreen from '../../screens/CreateActivityScreen/CreateActivityScreen'
import CreateSubActivityScreen from '../../screens/CreateSubActivityScreen/CreateSubActivityScreen'
import DateDetails from '../../screens/DateDetails/DateDetails'
import EditSubTask from '../../screens/EditSubTask/EditSubTask'
import EditTask from '../../screens/EditTask/EditTask'
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
          <Route path="/" element={<Navigate replace to="/home" />} />

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
          <Route exact path='/calendar/sub-create/:year-:month-:day/:taskId' element={<PrivateRoute/>}>
            <Route path='/calendar/sub-create/:year-:month-:day/:taskId' element={<CreateSubActivityScreen/>} />
          </Route>
          <Route exact path='/calendar/edit/:year-:month-:day/:id' element={<PrivateRoute/>}>
            <Route path='/calendar/edit/:year-:month-:day/:id' element={<EditTask/>} />
          </Route>
          <Route exact path='/calendar/edit-sub/:year-:month-:day/:id/:taskId' element={<PrivateRoute/>}>
            <Route path='/calendar/edit-sub/:year-:month-:day/:id/:taskId' element={<EditSubTask/>} />
          </Route>
        </Routes>
      )}
    </>
    
  )
}

export default Navigation