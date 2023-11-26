import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Enrolls = () => {

    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async()=>{
            try{
                const res = await axios.get("http://localhost:3090/enroll")
                console.log(res.data)
                setBooks(res.data)
            }catch(err){
                console.log("could not fetch data")
            }
        };
        fetchAllBooks();
    }, []);

  return (
    <div>
        <h3>Enrollments</h3>
        {books.map((book)=>(
                <div className='data' key={book.poi_no} >
                    <h2>{book.poi_no}</h2>
                    <p>{book.centre_id}</p>
                </div>
            ))}
    </div>
  )
}

export default Enrolls