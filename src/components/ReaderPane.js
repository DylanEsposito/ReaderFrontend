import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import '../ReaderStyle.css'; // Add some basic styling here
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import { Markup } from 'interweave';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TableOfContentsDrawer from "./TableOfContents"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const ReaderPane = ({ book_id }) => {

  const [bookTitle, setBookTitle] = useState("");
  const [bookContent, setContent] = useState("");
  const [tableOfContents, setTableOfContents] = useState(null);

  //DEE Get rid of book image, not used correctly
  const [bookImage, setImage] = useState("");

  console.log("This is the book id " + book_id);

  //DEE Refactor and rename this to something better Should be called only once on load
  useEffect(() => {
    const sendMessageToBackend = async () => {
      try {
        let tempValue = book_id;
        //console.log("Making request currently");
        const response = await axios.post('http://localhost:3088/books/newbook', {
          number: tempValue, // Sending the input value
        });
        //const response = await axios.get('http://localhost:3088/books/nextpage');
        //console.log(response.data.content);
        //console.log("We got a response from nextpage "  + response.data.content);
        //setContent(response.data.content);

        const bookResponse = await axios.get('http://localhost:3088/books/lastpage');
        setBookTitle(bookResponse.data.title);
        setContent(bookResponse.data.content);

        const tocResponse = await axios.get('http://localhost:3088/books/tableofcontents');
        console.log("We got a response when fetching the table of contents");
        console.log(tocResponse.data);
        setTableOfContents(tocResponse.data);
        //const response = await axios.post('https://your-backend-books.com/books/newbook', {
        //  number: tempValue, // Sending the input value
        //});
        //console.log(response.data);
        //setBookTitle(response.data.book_title);
        //setContent(response.data.content);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    sendMessageToBackend();
  }, []);

  const GoFowardTest  = () => {
    const fetchNextPage = async () => {
      try {
        const response = await axios.get('http://localhost:3088/books/nextpage');
        console.log("We got a response from nextpage "  + response.data);
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchNextPage();
  };

  const GoBack = () => {
    const fetchPreviousPage = async () => {
      try {
        const response = await axios.get('http://localhost:3088/books/previouspage');
        console.log("We got a response from previouspage");
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPreviousPage();
  };

  const GrabImage = () =>{
    const fetchImage = async () => {
      try {
        let tempValue = book_id;
        const response = await axios.post('http://localhost:3088/books/cover', {
          number: tempValue, // Sending the input value
        });
        console.log("We got a response from fetch image");
        //console.log(response.data);
        //setImage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchImage();
  }

  const [inputValue, setInputValue] = useState('');

  // Handle change event for the input field
  const handleJumpPageInput = (event) => {
    setInputValue(event.target.value); // Update state with the current value
  };

  const JumpPage = async (event) => {
    event.preventDefault(); // Prevent default form submission
    let tempValue = inputValue;
    try {
      const response = await axios.post('http://localhost:3088/books/jumppage', {
        number: tempValue, // Sending the input value
      });
      console.log("Passed the following value " + tempValue);
      console.log(response.data);
      setContent(response.data); // Update response message
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function createList(anchor, pValues) {
    if(pValues === null || pValues === undefined){
        console.log("List of values is empty");
        return <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            </List>
        </Box>
    }
    return <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pValues.map(bookObj => (
          <ListItem key={bookObj.chapter_index} disablePadding>
            <ListItemButton onClick={() => LoadChapter(bookObj.chapter_index)}>
              <ListItemText primary={bookObj.chapter_name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  }

  const LoadChapter  = (value) => {
    const fetchChapter = async () => {
      try {
        const response = await axios.post('http://localhost:3088/books/loadchapter', {
          number: value, // Sending the input value
        });
        setContent(response.data);
        //console.log("We got a response from LoadChapter "  + response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchChapter();
  };

  return ( 
  <SafeAreaView style={styles.container}>
    <View>
      <div>
        {['left', 'right', 'top', 'bottom'].map((anchor) => (
          <Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {createList(anchor, tableOfContents)}
            </Drawer>
          </Fragment>
        ))}
      </div>
      <Text style={styles.title}>
      <h2> {bookTitle} </h2>
      </Text>
      <View style={styles.fixToText}>
        <Button id="changePage"
          title="Left button"
          onClick={GoBack}
        />
        <div id="reader-window">
          <Button
            title="Retrieve book"
            onClick={GrabImage}
          />
          <form onSubmit={JumpPage}>
            <input
              type="text"
              onChange={handleJumpPageInput} // Update state on change
              placeholder="Enter page..."
            />
            <button type="submit">Submit</button>
          </form>
          <Markup content={bookContent} />
          <Markup content={bookImage} />
        </div>
        <Button id="changePage"
          title="Right button"
          onClick={GoFowardTest}
        />
      </View>
    </View>
  </SafeAreaView>
  )
}

export default ReaderPane;