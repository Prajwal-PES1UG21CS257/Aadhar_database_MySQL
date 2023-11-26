import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async()=>{
            try{
                const res = await axios.get("http://localhost:3090/data")
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
        <h1>Kushal Aadhar Database</h1>
        <div className='aadhar'>
            {books.map((book)=>(
                <div className='data' key={book.uid}>
                    <h2>{book.uid}</h2>
                    <p>{book.name}</p>
                    <p>{book.dob}</p>
                    <p>{book.address}</p>
                    <p>{book.gender}</p>
                </div>
            ))}

        </div>
    </div>
  )
}

export default Home