import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Show = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBookById = async () => {
          try {
            const response = await axios.get(`http://localhost:3090/data/${bookId}`);
            console.log(response.data);
            setBooks(response.data); // Assuming the backend returns an array
          } catch (err) {
            console.log("Could not fetch data", err);
          }
        };
      
        if (bookId) {
          fetchBookById();
        }
    }, [bookId]);


  return (
    <div class = "show">
      <h2>Your Aadhar Data</h2>
        {books.map((book) => (
            <div className='data' key={book.uid}>
            <h2>{book.uid}</h2>
            <p>{book.name}</p>
            <p>{book.dob}</p>
            <p>{book.address}</p>
            <p>{book.gender}</p>
            </div>
        ))}
    </div>
  )
}

export default Show


