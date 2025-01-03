// src/pages/About.js
import React from 'react';
import BookList from '../components/BookList';
import '../App.css'; // Add some basic styling here
import { useNavigate } from 'react-router-dom';

function Library() {
  
  return (
    <div className="Library">
      <BookList></BookList>
    </div>
  )
}

export default Library;
