import React from 'react'
import { Link } from 'react-router-dom'


const Admin = () => {

  return (
    <div>
      <div className='form'>
            <h1>Add Entries</h1>
            <button class = "button" ><Link class = "links" to = "/admin/add">Add</Link></button>
            <h1>Delete Entries</h1>
            <button class = "button" ><Link class = "links" to = "/admin/delete">Delete</Link></button>
            <h1>Queries</h1>
            <button class = "button" ><Link class = "links" to = "/admin/queries">Queries</Link></button>
        </div>
    </div>
  )
}

export default Admin