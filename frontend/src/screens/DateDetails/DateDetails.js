import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DateDetails.css'

const DateDetails = () => {
    const { year, month, day } = useParams()
    const [ activities, setActivities ] = useState()
    const [ error, setError ] = useState(false)
    const [ errorData, setErrorData ] = useState()
    const navigation = useNavigate()

    const [ title, setTitle ] = useState()
    const [ date, setDate ] = useState()
    const [ note, setNote ] = useState()
    

    useEffect(() => {
        GetActivities()
    }, [])

    const GetActivities = () => {
        fetch(`http://127.0.0.1:8000/api/activities/sub/${year}-${month}-${day}`)
        .then(data => data.json())
        .then((data) => {
            if(data.Response){
                console.log(data)
                setError(true)
                setErrorData(data.Response)
            }
            else{
                setActivities(data)
                console.log(data)
            }
        })
        .then((err) => console.log(err))
    }

    const AddActivity = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/activity/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                date: `${year}-${month}-${day}`,
                finished: false,
                note: note,
            })
        })
        .then(res => res.json())
        .then((data) => {
            document.location.reload()
        })
        .catch(err => {
            alert(err.message)
        }) 
    }

    return (
        <div>
            <p>{year}-{month}-{day}</p>
            <br/>
            <div>
                {error ? <h1>{errorData}</h1> : 
                    activities && activities.map((item) => (
                        <div key={item.id}>
                            <p>Activity: {item.title}</p>
                            <p>Activity date: {item.date}</p>
                            <br/>
                            {item.subActivity && item.subActivity.map((value) => (
                                <div key={item.id} style={{marginLeft: '30px'}}>
                                    <p>SubActivity: {value.title}</p>
                                    <p>SubActivityNote: {value.note}</p>
                                </div>
                            ))}
                        </div>
                    ))
                }
                
            </div>
            <h1>Create Activity</h1>
            <form method='POST' onSubmit={AddActivity} enctype="multipart/form-data" >
                <label>Title</label>
                <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <label>Note</label>
                <input type='text' placeholder='Note' onChange={(e) => setNote(e.target.value)} />
                <button type='submit'>Create Activity</button>
            </form>
        </div>
    )
}

export default DateDetails