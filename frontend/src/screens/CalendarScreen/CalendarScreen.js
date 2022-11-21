import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CalendarScreen.css'

const CalendarScreen = () => {
    const [calendar, setCalendar] = useState()
    const { year, month } = useParams()
    const navigation = useNavigate()
    
    useEffect(() => {
        getCalendar()
    }, [])

    const getTasks = () => {
        fetch(`http://127.0.0.1:8000/api/calendar/year-month/${year}/${month}`)
        .then(data => data.json())
        .then(data => {    
            var days = document.querySelectorAll('td')

            data.forEach((item) => {
                var dayNr = item.date.split('-')
                var title = item.title
                days.forEach((item1) => {    
                    var value = dayNr[2].charAt(1)
                    if(item1.innerHTML.includes(dayNr[2])){
                        var tag = document.createElement('p')
                        var text = document.createTextNode(title)
                        tag.style.padding = '0px 20px'
                        tag.style.lineHeight = '25px'
                        tag.appendChild(text)
                        item1.appendChild(tag)       
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
                    navigation(`/calendar/tasks/${year}-${month}-${parseInt(item.textContent)}`)
                }
            })
        })
    }

    const getCalendar = () => {
        fetch(`http://127.0.0.1:8000/api/calendar/${year}/${month}`)
        .then(data => data.json())
        .then(data => {
            if(data.Response){
                console.log('This year or month does not exists')
            }
            else{
                setCalendar(data) 
                setTimeout(() => {
                    AddZero()
                    getTasks()
                    SeeDetails()
                    document.querySelector('table').style.opacity = '1'
                }, [20]) 
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            {calendar && <div dangerouslySetInnerHTML={{ __html: calendar.Calendar }} /> }
        </div>
    )
}

export default CalendarScreen