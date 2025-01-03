import React from 'react';
import Chapter from './Chapter';

//DEE All of this can be deleted, not used
function Chapter (pages, id) {
    
}

const Book = () => {

  //console.log(bookCase.map);
  return (
    <div className="book-list">
      {bookCase.map(bookObj => (
        <BookPreview key={bookObj.id} bookPreview={bookObj} />
      ))}
    </div>
  );
};

export default BookList;