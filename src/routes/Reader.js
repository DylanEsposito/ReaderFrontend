
import React, { useEffect, useState } from 'react';
import ReaderPane from '../components/ReaderPane';
import '../ReaderStyle.css'; // Add some basic styling here
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Upon load should request backend to send over book information regarding Frankenstein
/*
<header className="Reader-header"></header>
        <h2>Reader Page</h2>
        <ReaderPane />
       
function Reader() {
  return (
    <div class = "Reader">
    </div>
  )
} */

function Reader() {

  console.log("Opening reader");

  let { id } = useParams();

  if(id === '' || id === undefined){
    console.log("Id is blank");
    id = 0;
  }

  //console.log(id);
  /*const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3088/api/message');
        console.log("We got a response from the express server");
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessage();
  }, []);
  <h1>{message}</h1>
  */

  return (
    <div>
      <ReaderPane book_id={id}/>
    </div>
  );
};


export default Reader;
