import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './HomeScreen.css'
import NavbarMain from '../../components/navigation/NavbarMain'
import plannedIcon from '../../static/icons/planned.png'
import planningIcon from '../../static/icons/planning.png'
import checkedIcon from '../../static/icons/checked.png'
import { AuthContext } from '../../contexts/AuthProvider'

const HomeScreen = () => {

  const [today, setToday] = useState()
  const [tommorow, setTommorow] = useState()
  const [dater, setDater] = useState()
  
  const [todayCounter, setTodayCounter] = useState()
  const [plannedCounter, setPlannedCounter] = useState()
  const [completedCounter, setCompletedCounter] = useState()

  const { accessToken } = useContext(AuthContext)

  useEffect(() => {
    TodaysActivities()
    TommorowActivities()
    GetDater()
    HomeDetailsStats()
  }, [])

  const GetDater = () => {
    var date = new Date()
    var day = date.getDate()
    var month = date.getUTCMonth() + 1
    var year = date.getUTCFullYear()
    var monthName = ""

    switch(month){
      case 1:
        monthName = 'January'
        break
      case 2:
        monthName = 'February'
        break
      case 3:
        monthName = 'March'
        break
      case 4:
        monthName = 'April'
        break
      case 5:
        monthName = 'May'
        break
      case 6:
        monthName = 'June'
        break
      case 7:
        monthName = 'July'
        break
      case 8:
        monthName = 'August'
        break
      case 9:
        monthName = 'September'
        break
      case 10:
        monthName = 'October'
        break
      case 11:
        monthName = 'November'
        break
      case 12:
        monthName = 'December'
        break
    }
    setDater(`${day} ${monthName} ${year}`)
  }

  const TodaysActivities = () => {
    var date = new Date()
    var day = date.getDate()
    var month = date.getUTCMonth() + 1
    var year = date.getUTCFullYear()
    
    fetch(`http://127.0.0.1:8000/api/activities/${year}-${month}-${day}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(data => data.json())
    .then(data => {
      setToday(data)
    })
    .catch(err => console.log(err))
  }

  const TommorowActivities = () => {
    var today = new Date()
    var tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    fetch(`http://127.0.0.1:8000/api/activities/${tomorrow.getFullYear()}-${tomorrow.getUTCMonth() + 1}-${tomorrow.getDate()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(data => data.json())
    .then(data => {
      setTommorow(data)
    })
    .catch(err => console.log(err))
  }

  const HomeDetailsStats = () => {
    fetch('http://127.0.0.1:8000/api/home-details-stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + accessToken
        }
    })
    .then(data => data.json())
    .then(data => {
      setTodayCounter(data.today)
      setPlannedCounter(data.planned)
      setCompletedCounter(data.completed)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='HomeContainer'>
      <NavbarMain/>
      <div className='HomeHeader'>
        <div className='HomeHeader1'>
          <div className='HomeHeaderDiv'>
            <div className='HomeHeaderDivIconDiv' style={{backgroundColor: 'rgb(199, 133, 11)'}}>
              <img src={plannedIcon} className='HomeHeaderDivIcon' alt='File Icon'/>
              {/* <a href="https://www.flaticon.com/free-icons/day" title="day icons">Day icons created by torskaya - Flaticon</a> */}
            </div>
            <div className='HomeHeaderDivRight'>
              <b>{todayCounter && todayCounter} today</b>
              <p>tasks</p>
            </div>
          </div>
          <div className='HomeHeaderDiv'>
            <div className='HomeHeaderDivIconDiv' style={{backgroundColor: 'rgb(38, 173, 153)'}}>
              <img src={planningIcon} className='HomeHeaderDivIcon' alt='File Icon'/>
              {/* <a href="https://www.flaticon.com/free-icons/strategic-plan" title="strategic plan icons">Strategic plan icons created by Freepik - Flaticon</a> */}
            </div>
            <div className='HomeHeaderDivRight'>
              <b>{plannedCounter && plannedCounter} planned </b>
              <p>days on progress</p>
            </div>
          </div>
          <div className='HomeHeaderDiv'>
            <div className='HomeHeaderDivIconDiv' style={{backgroundColor: 'rgb(32, 139, 10)'}}>
              <img src={checkedIcon} className='HomeHeaderDivIcon' alt='File Icon'/>
              {/* <a href="https://www.flaticon.com/free-icons/check" title="check icons">Check icons created by Freepik - Flaticon</a> */}
            </div>
            <div className='HomeHeaderDivRight'>
              <b>{completedCounter && completedCounter} tasks</b>
              <p>completed</p>
            </div>
          </div>
        </div>
        <div className='HomeHeaderDiv1'>
          <p>{dater && dater}</p>
        </div>
      </div>
      <div className='HomeMain'>
        <div className='HomeMain1'>
          <div className='HomeMainDiv'>
            <div className='HomeMainDivHeader'>
              <p>Today's Tasks</p>
            </div>
            {today && today.Response ? <h1 className='ErrorH1'>No tasks for today</h1> : today && today.map((item, counter) => (
              <div className='HomeMainDivContent' key={item.id}>
                <p className='HomeMainDivContentNr'>{counter+1}.</p>
                <h2>{item.title}</h2>
                {item.status == 'Important' ? <p className='HomeMainDivContentIconImportant'>{item.status}</p> : ''}
                {item.status == 'Long Term' ? <p className='HomeMainDivContentIconLong'>{item.status}</p> : ''}
                {item.status == 'Short Term' ? <p className='HomeMainDivContentIconShort'>{item.status}</p> : ''}
              </div>
            ))}          
          </div>
          <div className='HomeMainDiv'>
            <div className='HomeMainDivHeader'>
              <p>Tommorow's Tasks</p>
            </div>
            {tommorow && tommorow.Response ? <h1 className='ErrorH1'>No tasks for tomorrow</h1> : tommorow && tommorow.map((item, counter) => (
              <div className='HomeMainDivContent' key={item.id}>
                <p className='HomeMainDivContentNr'>{counter+1}.</p>
                <h2>{item.title}</h2>
                {item.status == 'Important' ? <p className='HomeMainDivContentIconImportant'>{item.status}</p> : ''}
                {item.status == 'Long Term' ? <p className='HomeMainDivContentIconLong'>{item.status}</p> : ''}
                {item.status == 'Short Term' ? <p className='HomeMainDivContentIconShort'>{item.status}</p> : ''}
              </div>
            ))}  
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default HomeScreen