import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NavbarMain from '../../components/navigation/NavbarMain'
import './DateDetails.css'
import searchIcon from '../../static/icons/search.png'
import arrowDownIcon from '../../static/icons/arrowDown.png'
import checkIcon from '../../static/icons/check.png'
import { AuthContext } from '../../contexts/AuthProvider'

const DateDetails = () => {
    const { year, month, day } = useParams()
    const [ activities, setActivities ] = useState()
    const [ error, setError ] = useState(false)
    const [ errorData, setErrorData ] = useState()
    const [ search, setSearch ] = useState('')
    const [ searchErrorData, setSearchErrorData ] = useState()
    const navigation = useNavigate()
    const location = useLocation()

    const [ finishedTasks, setFinishedTasks ] = useState()
    const [ notFinishedTasks, setNotFinishedTasks ] = useState()

    const { accessToken } = useContext(AuthContext)

    useEffect(() => {
        GetActivities()
    }, [location])

    const GetActivities = () => {
        fetch(`http://127.0.0.1:8000/api/activities/sub/${year}-${month}-${day}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(data => data.json())
        .then((data) => {
            if(data.Response){
                setError(true)
                setErrorData(data.Response)
            }
            else{
                setError(false)
                setActivities(data)
                var data1 = []
                var data2 = []

                for(var i = 0; i < Object.keys(data).length; i++){
                    if(data[i].finished == true){
                        data1.push(data[i])
                        
                    }
                    else{
                        data2.push(data[i])  
                    }
                }
                setFinishedTasks(data1.length)
                setNotFinishedTasks(data2.length)
            }
        })
        .then((err) => console.log(err))
    }

    const CompleteTask = (id) => {
        fetch(`http://127.0.0.1:8000/api/complete-task/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then((data) => {
            navigation(`/calendar/tasks/${year}-${month}-${day}`)
        })
        .catch(err => {
            alert(err.message)
        }) 
    }

    const CompleteSubTask = (id) => {
        fetch(`http://127.0.0.1:8000/api/complete-sub-task/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then((data) => {
            navigation(`/calendar/tasks/${year}-${month}-${day}`)
        })
        .catch(err => {
            alert(err.message)
        }) 
    }

    //Finish display data searched on page
    const SearchTask = () => {
        fetch(`http://127.0.0.1:8000/api/activities/sub/search/${search}/${year}-${month}-${day}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        })
        .then(data => data.json())
        .then((data) => {
            if(data.Response){
                setError(true)
                setErrorData(data.Response)
            }
            else{
                setActivities(data)
            }
        })
        .then((err) => console.log(err))
    }

    return (
        <div className='DateDetailsContainer'>
            <NavbarMain/>
            <div className='DateDetailsContainer1'>
                <div className='DateDetailsHeader'>
                    <div className='DateDetailsHeaderLeft'>
                        <h1>{year}-{month}-{day} Tasks</h1>
                        <Link to={`/calendar/create/${year}-${month}-${day}`} state={{background: location}} className='DateDetailsHeaderLeftLink'>Add New</Link>
                    </div>
                    <div className='DateDetailsHeaderRight'>
                        <div className='DateDetailsHeaderRightBar'>
                            <img src={searchIcon} className='DateDetailsHeaderRightIcon' alt='Search Icon' onClick={() => SearchTask()} />
                            {/* <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Pixel perfect - Flaticon</a> */}
                            <input type='text' className='DateDetailsHeaderRightInp' onChange={(e) => setSearch(e.target.value)} placeholder='Search Tasks' onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    SearchTask()
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className='DeteDetailsMain'>
                    <div className='DateDetailsMainBlock'>
                        <div className='DateDetailsMainBlockHeader'>
                            <img src={arrowDownIcon} className='DateDetailsMainBlockHeaderIcon' alt='Arrow Down Icon'/>
                            {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                            <p>Finish Me! ({notFinishedTasks && notFinishedTasks ? notFinishedTasks : 0})</p>
                        </div>
                        {error ? <h1 className='ErrorH1'>{errorData}</h1>  : 
                        activities && activities.map((item, counter) => (
                            <>
                            {!item.finished ?
                                <div className='DateDetailsMainBlockContent'>
                                    
                                    <div className='DateDetailsMainBlockContentMain' key={item.id}>
                                        <div className='DateDetailsMainBlockContentMainText'>
                                            <div className='DateDetailsMainBlockContentMainText2'>                                  
                                                <p className='DateDetailsMainBlockContentMainIcon' onClick={() => CompleteTask(item.id)}></p>
                                                <p className='DateDetailsMainBlockContentMainText1'>{item.title}</p>
                                            </div>
                                            <div className='DateDetailsMainBlockContentMainBtns'>
                                                {item.status == 'Important' ? <p className='DateDetailsMainBlockContentMainRightImportant'>{item.status}</p> : ''}
                                                {item.status == 'Long Term' ? <p className='DateDetailsMainBlockContentMainRightLong'>{item.status}</p> : ''}
                                                {item.status == 'Short Term' ? <p className='DateDetailsMainBlockContentMainRightShort'>{item.status}</p> : ''}
                                                <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                                {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                            </div>
                                        </div>
                                    </div>
                                    {item.subActivity && item.subActivity.map((value, counter1) => (
                                        <div className='DateDetailsMainBlockContentDetails1' key={value.id}>
                                            <div className={value.finished ? 'DateDetailsMainBlockContentDetailsFinished' : 'DateDetailsMainBlockContentDetails'}>
                                                <div className='DateDetailsMainBlockContentDetails1'>
                                                    <div className='DateDetailsMainBlockContentMainTextSmall'>
                                                        <div className='DateDetailsMainBlockContentMainText2'>
                                                            {value.finished ? <>
                                                                <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' />
                                                                {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                                            </>: <p className='DateDetailsMainBlockContentMainIcon' onClick={() => CompleteSubTask(value.id)}></p>}
                                                            <p className={value.finished ? 'DateDetailsMainBlockContentMainText1Finished' : 'DateDetailsMainBlockContentMainText1'}>{value.title}</p>
                                                        </div>
                                                        <div className='DateDetailsMainBlockContentMainBtns'>
                                                            {value.status == 'Important' ? <p className='DateDetailsMainBlockContentMainRightImportant'>{item.status}</p> : ''}
                                                            {value.status == 'Long Term' ? <p className='DateDetailsMainBlockContentMainRightLong'>{item.status}</p> : ''}
                                                            {value.status == 'Short Term' ? <p className='DateDetailsMainBlockContentMainRightShort'>{item.status}</p> : ''}                
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    ))}   
                                </div>   
                                : ''} 
                            </>
                           
                        ))}
                    </div>
                    <div className='DateDetailsMainBlock'>
                        <div className='DateDetailsMainBlockHeader'>
                            <img src={arrowDownIcon} className='DateDetailsMainBlockHeaderIcon' alt='Arrow Down Icon'/>
                            {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                            <p>Completed ({finishedTasks && finishedTasks ? finishedTasks : 0})</p>
                        </div>
                        {error ? <h1 className='ErrorH1'>Complete tasks to see them in this pannel</h1>  : 
                        activities && activities.map((item, counter) => (    
                            <>
                                {item.finished ?
                                <div className='DateDetailsMainBlockContent' >
                                    <div className='DateDetailsMainBlockContentMain' key={item.id}>
                                        <div className='DateDetailsMainBlockContentMainText'>
                                            <div className='DateDetailsMainBlockContentMainText2'>
                                                <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' />
                                                {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                                <p className='DateDetailsMainBlockContentMainText1'>{item.title}</p>
                                            </div>
                                            <div className='DateDetailsMainBlockContentMainBtns'>
                                                {item.status == 'Important' ? <p className='DateDetailsMainBlockContentMainRightImportant'>{item.status}</p> : ''}
                                                {item.status == 'Long Term' ? <p className='DateDetailsMainBlockContentMainRightLong'>{item.status}</p> : ''}
                                                {item.status == 'Short Term' ? <p className='DateDetailsMainBlockContentMainRightShort'>{item.status}</p> : ''}
                                                <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                                {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {item.subActivity && item.subActivity.map((value, counter1) => (
                                        <div className='DateDetailsMainBlockContentDetails1' key={value.id}>
                                            <div className='DateDetailsMainBlockContentDetails'>
                                                <div className='DateDetailsMainBlockContentDetails1'>
                                                    <div className='DateDetailsMainBlockContentMainTextSmall'>
                                                        <div className='DateDetailsMainBlockContentMainText2'>
                                                            <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' />
                                                            {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}                     
                                                            <p className='DateDetailsMainBlockContentMainText1'>{value.title}</p>
                                                        </div>
                                                        <div className='DateDetailsMainBlockContentMainBtns'>
                                                            {value.status == 'Important' ? <p className='DateDetailsMainBlockContentMainRightImportant'>{item.status}</p> : ''}
                                                            {value.status == 'Long Term' ? <p className='DateDetailsMainBlockContentMainRightLong'>{item.status}</p> : ''}
                                                            {value.status == 'Short Term' ? <p className='DateDetailsMainBlockContentMainRightShort'>{item.status}</p> : ''}               
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>   :''}        
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateDetails