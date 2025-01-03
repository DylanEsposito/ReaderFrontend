import React, { useEffect, useState } from 'react';
import BookPreview from './BookPreview';
import axios from 'axios';
import LoadingBar from './LoadingBar';

const BookList = () => {

  const [bookCase, setBookCase] = useState(null);

  useEffect(() => {

    const fetchLibrary = async () => {
      try {
        const response = await axios.get('http://localhost:3088/books/library');
        //console.log("We got a library");
        console.log(response.data);
        //console.log(response.data);
        setBookCase(response.data);
        
        /*for(let i = 0; i < response.data.length; i++){
            setBookCase(response.data[i]);
          }
        console.log(bookCase.length);*/
        
        //bookCase.forEach(bookObj => {
          //console.log("This is the entry");
          //console.log(bookObj);
        //})*/
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLibrary();
  }, []);
  
  if (!bookCase) {
    return <LoadingBar></LoadingBar> // Display a loading message while fetching data
  }else{
    console.log("We got a bookcase with something");
  }

  return (
    <div className="book-list">
      {bookCase.map(bookObj => (
        <BookPreview key={bookObj.book_id} bookPreview={bookObj} />
      ))}
    </div>
    );
};

export default BookList;