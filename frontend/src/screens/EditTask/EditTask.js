import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import closeIcon from '../../static/icons/close.png'

const EditTask = () => {
    const { accessToken, user } = useContext(AuthContext)
    const navigation = useNavigate()

    const { year, month, day, id } = useParams()

    const [ title, setTitle ] = useState()
    const [ note, setNote ] = useState()
    const options = ['Short Term', 'Important', 'Long Term']
    const [ status, setStatus ] = useState(options[0])
    const location = useLocation()
    const [ error, setError ] = useState()

    const EditActivityPUT = (e) => {
        e.preventDefault()
        fetch(`http://127.0.0.1:8000/api/activity/edit/${id}`, {
            method: "PUT",
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

    const EditActivityGET = (e) => {
        fetch(`http://127.0.0.1:8000/api/activity/edit/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(data => data.json())
        .then((data) => {
            if(data.Response){
                setError(data.Response)
            }
            else{
                setTitle(data.title)
                setNote(data.note)
                setStatus(data.status)
            }
        })
        .then((err) => console.log(err))
    }

    const navigate = useNavigate();

    useEffect(() => {
        EditActivityGET()
    }, [])

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    }, [location]);

    return (
        <div className='CreateActivityContainer'>
            <form method='PUT' onSubmit={EditActivityPUT} className='CreateActivityForm'>
                <img className='CreateActivityBackIcon' src={closeIcon} alt='Back Icon' onClick={() => navigate(-1)} />
                {/* <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by ariefstudio - Flaticon</a> */}
                <h1>Edit Activity</h1>
                <input type='text' placeholder='Title' value={title} className='CreateActivityInp' onChange={(e) => setTitle(e.target.value)} />
                <textarea type='text' placeholder='Note' value={note} className='CreateActivityInp1' onChange={(e) => setNote(e.target.value)} />
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
                <button className='CreateActivityBtn' type='submit'>Edit Activity</button>          
            </form>
        </div>
    )
}

export default EditTask