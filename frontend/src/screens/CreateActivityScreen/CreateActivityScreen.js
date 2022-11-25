import React, { useContext, useEffect, useState } from 'react'
import './CreateActivityScreen.css'
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import closeIcon from '../../static/icons/close.png'

const CreateActivityScreen = () => {
    const { accessToken, user } = useContext(AuthContext)
    const navigation = useNavigate()

    const { year, month, day } = useParams()

    const [ title, setTitle ] = useState()
    const [ note, setNote ] = useState()
    const options = ['Short Term', 'Important', 'Long Term']
    const [ status, setStatus ] = useState(options[0])
    const location = useLocation()

    const AddActivity = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/activity/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                title: title,
                date: `${year}-${month}-${day}`,
                finished: false,
                note: note,
                user: user.user_id,
                status: status
            })
        })
        .then(res => res.json())
        .then((data) => {
            navigation(`/calendar/tasks/${year}-${month}-${day}`)
        })
        .catch(err => {
            alert(err.message)
        }) 
    }

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    }, [location]);

    return (
        <div className='CreateActivityContainer'>
            <form method='POST' onSubmit={AddActivity} className='CreateActivityForm'>
                <img className='CreateActivityBackIcon' src={closeIcon} alt='Back Icon' onClick={() => navigate(-1)} />
                {/* <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by ariefstudio - Flaticon</a> */}
                <h1>Create Activity</h1>
                <input type='text' placeholder='Title' className='CreateActivityInp' onChange={(e) => setTitle(e.target.value)} />
                <textarea type='text' placeholder='Note' className='CreateActivityInp1' onChange={(e) => setNote(e.target.value)} />
                <select 
                    className='CreateActivitySelect'
                    value={status} 
                    onChange={e => setStatus(e.target.value)}>
                    {options.map((value) => (
                        <option className='CreateActivityOption' value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <button className='CreateActivityBtn' type='submit'>Create Activity</button>          
            </form>
        </div>
    )
}

export default CreateActivityScreen