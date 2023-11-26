import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

const Ecentre = () => {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [inputs, setInputs] = useState({
        poi_no: '',
        centre_id: ''
    });


    useEffect(()=>{
        const fetchAllBooks = async()=>{
            try{
                const res = await axios.get("http://localhost:3090/ecenters")
                console.log(res.data)
                setBooks(res.data)
            }catch(err){
                console.log("could not fetch data")
            }
        };
        fetchAllBooks();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3090/enroll", inputs);
            console.log(response.data);
            // Optionally reset the inputs after successful submission
            // setInputs({ poi_no: '', centre_id: '' });
            navigate("/enrolls");
        } catch (err) {
            console.log("Error submitting data", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
        console.log(name, value)
    };

  return (
    <div>
        <h1>Enrollment Centres</h1>
        <div className='ecenter'>
            <div>
                <input type= 'number' onChange={handleChange} placeholder='poi_number' name = "poi_no"/>
                <input type= 'number' onChange={handleChange} placeholder='centre_id' name = "centre_id"/>
            </div>
        <button onClick={handleSubmit}>Enroll</button>
        <button><Link to ="/enrolls" class = "links" >Enrollments</Link></button>
            {books.map((book)=>(
                <div className='data' key={book.centre_id}>
                    <h2>{book.centre_id}</h2>
                    <p>{book.centre_name}</p>
                    <p>{book.centre_address}</p>
                    <p>{book.type}</p>
                </div>
            ))}

        </div>
    </div>
  )
}

export default Ecentre