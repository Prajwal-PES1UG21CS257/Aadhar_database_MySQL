import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Add = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[4];

    const [book,setBooks] = useState({
        uid : "",
        name : "",
        dob : "",
        gender : "",
        address : "",
        email : "",
        phno : null,
        biometric_data : "",
        poi_no : null,
        center_id : null
    });

    const handleChange = (e) => {
        setBooks((prev)=> ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log(book)

    const handleClick = async (e) => {
        
        e.preventDefault();
        try{
            console.log(bookId);
            console.log("first")
            await axios.put("http://localhost:3090/data/"+ bookId, book);
            navigate("/home");
        }catch(err){
        console.log(err)
        }
    };

  return (
    <div>
      <div className='form'>
            <h1>Update Entries</h1>
            <input type= 'number' placeholder='UID' onChange={handleChange} name = "uid"/>
            <input type= 'text' placeholder='Name' onChange={handleChange} name = "name"/>
            <input type= 'date' placeholder='DOB'onChange={handleChange} name = "dob" />
            <input type= 'text' placeholder='Gender' onChange={handleChange} name = "gender" />
            <input type= 'text' placeholder='Address' onChange={handleChange} name = "address" />
            <input type= 'text' placeholder='email' onChange={handleChange} name = "email" />
            <input type= 'number' placeholder='phno' onChange={handleChange} name = "phno" />
            <input type= 'text' placeholder='biometric' onChange={handleChange} name = "biometic_data" />
            <input type= 'number' placeholder='poi_no' onChange={handleChange} name = "poi_no" />
            <input type= 'number' placeholder='center_id' onChange={handleChange} name = "center_id" />
            <button class = "button" onClick={handleClick} >Update</button>
        </div>
    </div>
  )
}

export default Add