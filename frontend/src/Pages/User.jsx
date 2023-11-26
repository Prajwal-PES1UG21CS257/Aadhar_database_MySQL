import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

const User = () => {

    const [input, setInput] = useState({
        uid: '',
        address: ''
    });

    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { uid, address } = input;
        if (!uid || !address) {
          alert("Please fill both uid and address fields.");
          return;
        }
    
        try {
          await axios.put(`http://localhost:3090/user/${uid}`, { address });
          alert("Address updated successfully");
          navigate(`/show/${uid}`); // Or any other route you want to navigate to
        } catch (err) {
          console.error(err);
          alert("Failed to update address");
        }
      };
      const uidValue = input.uid;
    
  return (
    <div class = "user">
        <h2>User</h2>
        <input type= 'number' placeholder='UID' onChange={handleChange} name = "uid"/>
        <button class = "button" ><Link class = "links" to = {`/show/${uidValue}`} >Show data</Link></button>
        <input type= 'text' placeholder='Address' onChange={handleChange} name = "address" />
        <button class = "button" on onClick={handleUpdate}>Address Update</button>
        <button><Link class= "links" to= "/enrollmentCentre" >List Enrollment Centres</Link></button>
    </div>
  )
}

export default User