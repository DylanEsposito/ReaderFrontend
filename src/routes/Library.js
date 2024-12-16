// src/pages/About.js
import React from 'react';
import BookList from '../components/BookList';
import '../App.css'; // Add some basic styling here
import { useNavigate } from 'react-router-dom';

/*
Working book list, remove whatever is at the bottom for this when we're eventually all set testing
<div className="Library">
    <header className="App-header">
        <h1>User Library</h1>
      </header>
      <main>
        <BookList/>
      </main>
    </div>
*/

//DEE To remove
const testBook = {
    book_id: 1,
    title: "Frankenstein",
    author: "Mary Shelley",
    image: "Frakenstein_Cover.png"
}

//DEE To remove
//<BookPreview key={testBook.book_id} bookPreview={testBook} />
function Library() {
  
  return (
    <div className="Library">
    <header className="App-header">
        <h1>User Library</h1>
      </header>
      <main>
        <BookList></BookList>
      </main>
    </div>
  )
}

export default Library;
