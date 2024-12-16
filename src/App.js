import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Library from './routes/Library';
import Reader from './routes/Reader';
import './App.css'; // Add some basic styling here

function App() {
  //Return a list of all books that we have
  /*
  <nav>
          <ul>
            <li><Link to="/">Library</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

  <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/reader" element={<Reader />} />
        </Routes>
      </div>
      </Router>
    </div>
  */
  /*
  Old setup with booklist
  <div className="App">
    <header className="App-header">
        <h1>User Library</h1>
      </header>
      <main>
        <BookList/>
      </main>
    </div>
  */
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Library</Link></li>
            <li><Link to="/reader">Reader</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/reader/" element={<Reader />} />
          <Route path="/reader/:id" element={<Reader />} />
        </Routes>
      </div>
      </Router>
    </div>
  )
}

export default App;