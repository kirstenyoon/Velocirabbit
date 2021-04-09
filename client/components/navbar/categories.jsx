import { AddCommentTwoTone, Favorite, Games } from '@material-ui/icons';
import { Box, Breadcrumbs, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GamesIcon from '@material-ui/icons/Games';
function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [icons, setIcons] = useState([<FavoriteIcon/>, <GamesIcon/>, <PersonIcon/>]);

  useEffect(() => {
    fetch('/api/categoryList')
      .then((res) => res.json())
      .then((arrOfCategories) => setCategories(arrOfCategories))
      .catch((err) => console.log('There has been a problem with fetching categories ', err));
  }, []);

  // fetch data based on category by attaching specific category as a query parameter to the end of URL
  function getItemByButton(cat) {
    console.log(cat);
    fetch(`api/categoryProducts?Category=${cat}`)
      .then((res) => res.json())
      .then((items) => {
        console.log(items);
        return props.setState(items);
      })
      .catch((err) => console.log('There has been a problem with fetching categories: ', err));
  }
  return (
   // <Box display="flex" justifyContent="space_between">
   <Breadcrumbs separator=' | '>
      {
      categories
        .map((category, index) => (
          <Button color="#FF2E00" 
                  variant="contained" 
                  id={category} 
                  key={index} 
                  onClick={() => getItemByButton(category)}
          >
            {icons && icons[index]}
            {category}
          </Button>
        ))
      }
      </Breadcrumbs>
  );
}
export default Categories;
