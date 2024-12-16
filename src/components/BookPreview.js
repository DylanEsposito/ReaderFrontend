import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCover from './BookCover';

const BookPreview = ({ bookPreview }) => { 
  //DEEM This is bad since we're declaring each book preview to instaniate useNavigate and a clicker
  const navigate = useNavigate();

  const loadBook = (pBook_Id) => {
    navigate(`/reader/${pBook_Id}`);
  };
  
  //<button onClick={handleClick}>Click </button>

  //<img src={(process.env.PUBLIC_URL + bookPreview.image)} alt={bookPreview.title}></img>
  //<img src={logo} alt="Logo" />;
  //DEE For button, it will take the book_id that is passed and should load it into the reader page
  return (
    <div className="book-preview">
      <h2>{bookPreview.name}</h2>
      <p>by {bookPreview.author}</p>
      <BookCover bookId={bookPreview.book_id}></BookCover>
      <button onClick={() => loadBook(bookPreview.book_id)}>Click </button>
    </div>
  );
};

export default BookPreview;