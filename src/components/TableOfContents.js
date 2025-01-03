import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';

//DEE We should probably pass the table of contents along with the links to each page
const TableOfContentsDrawer = () => {

  const [tableOfContents, setTableOfContents] = useState(null);
  useEffect (() => {
    const fetchTableOfContents = async () => {
        try{
            const response = await axios.get('http://localhost:3088/books/tableofcontents');
            console.log("We got a response from the express server");
            console.log(response.data);
            setTableOfContents(response.data);
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchTableOfContents();
  }, []);

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

  var listVals = ['Frankenstein', 'or, the Modern Prometheus', 'Contents', 'Letter 1', 'Letter 2', 'Letter 3'
    ,'Letter 4','Chapter 1', 'Chapter 2', 'Chapter 3','Chapter 4', 'Chapter 5', 'Chapter 6',
    'Chapter 6', 'Chapter 7', 'Chapter 8','Chapter 9', 'Chapter 10', 'Chapter 11',
  ]

  function testCall(value){
    console.log("Received a click " + value);
  }

  const LoadChapter  = (value) => {
    const fetchChapter = async () => {
      try {
        const response = await axios.post('http://localhost:3088/books/loadchapter', {
          number: value, // Sending the input value
        });
        console.log("We got a response from nextpage "  + response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchChapter();
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

  /*
<List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem key={text} disablePadding>
        <ListItemButton>
            <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
        </ListItem>
    ))}
    </List>
    <Divider />
    <List>
    {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
        <ListItemButton>
            <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
        </ListItem>
    ))}
    </List>
  */

  /*
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {tableOfContents.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );*/

  return (
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
  );
}

export default TableOfContentsDrawer;