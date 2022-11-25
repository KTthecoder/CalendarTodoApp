import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NavbarMain from '../../components/navigation/NavbarMain'
import './CalendarScreen.css'
import arrowRightIcon from '../../static/icons/rightArrow.png'
import arrowLeftIcon from '../../static/icons/leftArrow.png'
import { AuthContext } from '../../contexts/AuthProvider'

const CalendarScreen = () => {
    const [calendar, setCalendar] = useState()
    const { year, month } = useParams()
    const [calendarError, setCalendarError] = useState(false)
    const navigation = useNavigate()
    const [ dateText, setDateText ] = useState()
    const location = useLocation()

    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        getCalendar()
    }, [location])

    const ChangeCalendar = (direction) => {
        var month1 = month
        var year1 = year

        if(direction === 'left'){
            if(month1 == 1){
                month1 = 12
                year1 = year1 - 1
                navigation(`/calendar/${year1}/${month1}`)
            }
            else{
                month1 = month1 - 1
                navigation(`/calendar/${year1}/${month1}`)
            }
        }

        if(direction === 'right'){
            if(month1 == 12){
                month1 = 1
                year1 = parseInt(year1) + 1
                navigation(`/calendar/${year1}/${month1}`)
            }
            else{
                month1 = parseInt(month1) + 1
                navigation(`/calendar/${year1}/${month1}`)
            }
        }
    }

    const getTasks = () => {
        fetch(`http://127.0.0.1:8000/api/calendar/year-month/${year}/${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(data => data.json())
        .then(data => {    
            var days = document.querySelectorAll('td')

            data.forEach((item) => {
                var dayNr = item.date.split('-')
                var title = item.title

                days.forEach((item1) => {    
                    if(item1.innerHTML.includes(dayNr[2]) && month == dayNr[1]){
                        if(item1.getElementsByTagName('p').length < 2){
                            var tagP = document.createElement('p')
                            var tagDiv = document.createElement('div')
                            var text = document.createTextNode(title)
                            tagDiv.classList.add("calendarTask")
                            tagP.appendChild(text)
                            tagDiv.appendChild(tagP)
                            item1.appendChild(tagDiv)     
                        }
                        else {
                            var tagP = document.createElement('p')
                            var tagDiv = document.createElement('div')
                            var text = document.createTextNode("and more...")
                            tagDiv.classList.add("calendarTaskk")
                            tagP.appendChild(text)
                            tagDiv.appendChild(tagP)
                            item1.appendChild(tagDiv) 
                        }
                    }
                })
            }) 
        })
        .catch(err => console.log("There are not any activities"))
    }

    const AddZero = () => {
        var days = document.querySelectorAll('td')

        days.forEach((item) => {
            if(item.innerHTML.charAt(0) === "1" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "01"
            }
            if(item.innerHTML.charAt(0) === "2" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "02"
            }
            if(item.innerHTML.charAt(0) === "3" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "03"
            }
            if(item.innerHTML.charAt(0) === "4" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "04"
            }
            if(item.innerHTML.charAt(0) === "5" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "05"
            }
            if(item.innerHTML.charAt(0) === "6" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "06"
            }
            if(item.innerHTML.charAt(0) === "7" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "07"
            }
            if(item.innerHTML.charAt(0) === "8" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "08"
            }
            if(item.innerHTML.charAt(0) === "9" && item.innerHTML.charAt(1) === ""){
                item.innerHTML = "09"
            }  
        })
    }

    const SeeDetails = () => {
        var days = document.querySelectorAll('td')

        days.forEach((item) => {
            item.addEventListener('click', () => {
                if(item.innerHTML === "&nbsp;"){}
                else{
                    navigation(`/calendar/tasks/${year}-${month}-${parseInt(item.textContent.charAt(0) + item.textContent.charAt(1))}`)
                }
            })
        })
    }

    const CreateHeader = () => {
        var th = document.querySelectorAll('th')[0].textContent
        document.querySelectorAll('tr')[0].style.display = 'none'
        setDateText(th)
    }

    const getCalendar = () => {
        fetch(`http://127.0.0.1:8000/api/calendar/${year}/${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(data => data.json())
        .then(data => {
            if(data.Response){
                setCalendarError(true)
            }
            else{
                setCalendar(data) 
                setTimeout(() => {
                    AddZero()
                    getTasks()
                    SeeDetails()
                    CreateHeader()
                    document.querySelector('table').style.opacity = '1'
                }, [20]) 
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='calendarContainer'>
            <NavbarMain/>
            <div className='calendarHeader'>
                <div className='calendarHeaderText'>
                    <p>{dateText && dateText}</p>
                </div>
                <div className='calendarHeaderBtnsDiv'>
                    <div className='calendarHeaderBtn'>
                        <img src={arrowLeftIcon} onClick={() => ChangeCalendar('left')} className='calendarHeaderBtnIcon' alt='Arrow Left Icon' />
                        {/* <a href="https://www.flaticon.com/free-icons/back" title="back icons">Back icons created by Roundicons - Flaticon</a> */}
                    </div>
                    <div className='calendarHeaderBtn'>
                        <img src={arrowRightIcon} onClick={() => ChangeCalendar('right')} className='calendarHeaderBtnIcon' alt='Arrow Right Icon' />
                        {/* <a href="https://www.flaticon.com/free-icons/next" title="next icons">Next icons created by Roundicons - Flaticon</a> */}
                    </div>
                </div>
            </div>
            {calendarError ? <h1>This month or year does't exists</h1> :  calendar && <div dangerouslySetInnerHTML={{ __html: calendar.Calendar }} /> }
        </div>
    )
}

export default CalendarScreen