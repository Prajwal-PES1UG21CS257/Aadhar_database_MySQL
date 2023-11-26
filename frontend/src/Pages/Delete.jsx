import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Delete = () => {

    const [uid, setUid] = useState('');

    const handleChange = (event) => {
        setUid(event.target.value);
    };


  return (
    <div className='delete'>
        <h1>Enter Uid to delete</h1>
        <div >
        <input type= 'number' placeholder='UID' onChange={handleChange} name = "uid"/>
        <button class = "button" ><Link class = "links" to={`/admin/delete/update/${uid}`} >Delete</Link></button>
        <button class = "button" ><Link class = "links" to={`/admin/delete/update1/${uid}`} >Update</Link></button>
        </div>
    </div>
  )
}

export default Delete