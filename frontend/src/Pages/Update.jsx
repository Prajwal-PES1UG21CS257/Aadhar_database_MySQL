import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[4];
    
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
    
    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:3090/data/"+ id);
            navigate("/admin");
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div class = "delete">
            <h1>Aadhar Database</h1>
            {books.map((book) => (
            <div className='data' key={book.uid}>
            <h2>{book.uid}</h2>
            <p>{book.name}</p>
            <p>{book.dob}</p>
            <p>{book.address}</p>
            <p>{book.gender}</p>
            <button className="delete" onClick={()=>{handleDelete(book.uid)}}>Delete</button>
            </div>
        ))}
        </div>
      )

}

export default Update