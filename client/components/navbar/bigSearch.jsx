import React, { useState } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#F1EAEA', 0.4),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.4),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    marginLeft: theme.spacing(3),
    width: '50%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export default function BigSearch(props) {
  const [searchInput, setSearchInput] = useState('');
  // console.log(searchInput)
  const classes = useStyles();

  /*
  Insert fetchData as a second parameter to the fetchItem function
  use POST request to send keyword in the req.body to the server
  */
  const fetchData = {
    method: 'POST',
    body: JSON.stringify({ productName: searchInput }),
    headers: { 'Content-Type': 'application/json' },
  };

  /* Fetch from server */
  function fetchItem() {
    fetch('/api/productSearch', fetchData)
      .then((res) => res.json())
      .then((data) => {
        console.log("product search successed: ", data);
        return props.setState(data);
      })
      .catch((err) => console.log('There has been a problem with fetching items ', err));
  }

  /* Update state on every keystroke */
  function handleChange(event) {
    setSearchInput(event.target.value);
  }
  /* Fetch on pressing enter key */
  function getItemByEnterKey(event) {
    if (event.key === 'Enter') return fetchItem();
  }
  /* Fetch on clicking button */
  // function getItemByButton() {
  //   return fetchItem();
  // }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        type="text"
        placeholder="Search.."
        color='#000000'
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => getItemByEnterKey(e)}
      />
      {/* <button onClick={() => getItemByButton()}>Search</button> */}
      {/* <button onClick={() => getItemByButton()}>Search</button> */}
    </div>
  );
}
