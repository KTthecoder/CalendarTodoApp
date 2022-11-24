import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavbarMain from '../../components/navigation/NavbarMain'
import './DateDetails.css'
import searchIcon from '../../static/icons/search.png'
import arrowDownIcon from '../../static/icons/arrowDown.png'
import checkIcon from '../../static/icons/check.png'

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
        <div className='DateDetailsContainer'>
            <NavbarMain/>
            <div className='DateDetailsContainer1'>
                <div className='DateDetailsHeader'>
                    <div className='DateDetailsHeaderLeft'>
                        <h1>{year}-{month}-{day} Tasks</h1>
                        <Link to='/' className='DateDetailsHeaderLeftLink'>Add New</Link>
                    </div>
                    <div className='DateDetailsHeaderRight'>
                        <div className='DateDetailsHeaderRightBar'>
                            <img src={searchIcon} className='DateDetailsHeaderRightIcon' alt='Search Icon' />
                            {/* <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Pixel perfect - Flaticon</a> */}
                            <input type='text' className='DateDetailsHeaderRightInp' placeholder='Search Tasks' />
                        </div>
                    </div>
                </div>
                <div className='DeteDetailsMain'>
                    <div className='DateDetailsMainBlock'>
                        <div className='DateDetailsMainBlockHeader'>
                            <img src={arrowDownIcon} className='DateDetailsMainBlockHeaderIcon' alt='Arrow Down Icon'/>
                            {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                            <p>Finish Me! (3)</p>
                        </div>
                        <div className='DateDetailsMainBlockContent'>
                            <div className='DateDetailsMainBlockContentMain'>
                                <div className='DateDetailsMainBlockContentMainText'>
                                    <div className='DateDetailsMainBlockContentMainText2'>
                                        {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                        {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                        <p className='DateDetailsMainBlockContentMainIcon'></p>
                                        <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                    </div>
                                    <div className='DateDetailsMainBlockContentMainBtns'>
                                        <p className='DateDetailsMainBlockContentMainRightImportant'>Important</p>
                                        <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                        {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className='DateDetailsMainBlockContentDetails'>
                                <div className='DateDetailsMainBlockContentDetails1'>
                                    <div className='DateDetailsMainBlockContentMainTextSmall'>
                                        <div className='DateDetailsMainBlockContentMainText2'>
                                            {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                            {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                            <p className='DateDetailsMainBlockContentMainIcon'></p>
                                            <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                        </div>
                                        <div className='DateDetailsMainBlockContentMainBtns'>
                                            <p className='DateDetailsMainBlockContentMainRightImportant'>Important</p>                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='DateDetailsMainBlockContentDetails'>
                                <div className='DateDetailsMainBlockContentDetails1'>
                                    <div className='DateDetailsMainBlockContentMainTextSmall'>
                                        <div className='DateDetailsMainBlockContentMainText2'>
                                            {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                            {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                            <p className='DateDetailsMainBlockContentMainIcon'></p>
                                            <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                        </div>
                                        <div className='DateDetailsMainBlockContentMainBtns'>
                                            <p className='DateDetailsMainBlockContentMainRightImportant'>Important</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='DateDetailsMainBlockContentDetails'>
                                <div className='DateDetailsMainBlockContentDetails1'>
                                    <div className='DateDetailsMainBlockContentMainTextSmall'>
                                        <div className='DateDetailsMainBlockContentMainText2'>
                                            {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                            {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                            <p className='DateDetailsMainBlockContentMainIcon'></p>
                                            <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                        </div>
                                        <div className='DateDetailsMainBlockContentMainBtns'>
                                            <p className='DateDetailsMainBlockContentMainRightImportant'>Important</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='DateDetailsMainBlockContent'>
                            <div className='DateDetailsMainBlockContentMain'>
                                <div className='DateDetailsMainBlockContentMainText'>
                                    <div className='DateDetailsMainBlockContentMainText2'>
                                        {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                        {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                        <p className='DateDetailsMainBlockContentMainIcon'></p>
                                        <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                    </div>
                                    <div className='DateDetailsMainBlockContentMainBtns'>
                                        <p className='DateDetailsMainBlockContentMainRightLong'>Long Term</p>
                                        <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                        {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='DateDetailsMainBlockContent'>
                            <div className='DateDetailsMainBlockContentMain'>
                                <div className='DateDetailsMainBlockContentMainText'>
                                    <div className='DateDetailsMainBlockContentMainText2'>
                                        {/* <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' /> */}
                                        {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                        <p className='DateDetailsMainBlockContentMainIcon'></p>
                                        <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                    </div>
                                    <div className='DateDetailsMainBlockContentMainBtns'>
                                        <p className='DateDetailsMainBlockContentMainRightShort'>Short Term</p>
                                        <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                        {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    <div className='DateDetailsMainBlock'>
                        <div className='DateDetailsMainBlockHeader'>
                            <img src={arrowDownIcon} className='DateDetailsMainBlockHeaderIcon' alt='Arrow Down Icon'/>
                            {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                            <p>Completed (5)</p>
                        </div>
                        <div className='DateDetailsMainBlockContent'>
                            <div className='DateDetailsMainBlockContentMain'>
                                <div className='DateDetailsMainBlockContentMainText'>
                                    <div className='DateDetailsMainBlockContentMainText2'>
                                        <img src={checkIcon} className='DateDetailsMainBlockContentMainIcon1' alt='Check Icon' />
                                        {/* <a href="https://www.flaticon.com/free-icons/foursquare-check-in" title="foursquare check in icons">Foursquare check in icons created by hqrloveq - Flaticon</a>  */}
                                        {/* <p className='DateDetailsMainBlockContentMainIcon'></p> */}
                                        <p className='DateDetailsMainBlockContentMainText1'>Task to complete one Task to complete one</p>
                                    </div>
                                    <div className='DateDetailsMainBlockContentMainBtns'>
                                        <p className='DateDetailsMainBlockContentMainRightShort'>Short Term</p>
                                        <img src={arrowDownIcon} className='DateDetailsMainBlockContentMainBtnsIcon' alt='Arrow Down Icon'/>
                                        {/* <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">Arrow icons created by Freepik - Flaticon</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
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
                
            </div> */}
            {/* <h1>Create Activity</h1>
            <form method='POST' onSubmit={AddActivity} enctype="multipart/form-data" >
                <label>Title</label>
                <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <label>Note</label>
                <input type='text' placeholder='Note' onChange={(e) => setNote(e.target.value)} />
                <button type='submit'>Create Activity</button>
            </form> */}
        </div>
    )
}

export default DateDetails