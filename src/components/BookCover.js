import React, { useEffect, useState } from 'react';
import axios from 'axios';

//DEE Chat-gpt did all the heavy lifting, let's refactor and be a bit more clever
const BookCover = ({ bookId }) => {
    const [coverURL, setCover] = useState("");

    /*useEffect(() => {
        //Using axios, we have to covert the response to a blob 
        axios.get('http://localhost:3088/books/image', { responseType: 'blob' })
        .then(response => {
            // Use the built-in url to create a loadable url
            console.log(response.data);
            const coverURL = URL.createObjectURL(response.data);
            setCover(coverURL);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }, []);*/
    
    useEffect(() => {
        let tempValue = bookId;
        //Using axios, we have to covert the response to a blob 
        axios.post('http://localhost:3088/books/cover', { number: tempValue} , {responseType: 'blob' })
        .then(response => {
            // Use the built-in url to create a loadable url
            //const coverURL = URL.createObjectURL(response.data);
            console.log(response.data);
            const coverURL = URL.createObjectURL(response.data);
            setCover(coverURL);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }, []);
    
  return (
    <div>
        {coverURL && <img src={coverURL} alt="No book cover"/>}
    </div>
  );
};

export default BookCover;