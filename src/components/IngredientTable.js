import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const formQueryString = (s) => {
  return s.replace(/\s/g, "+");
}

const LinkedShoppingCart = ({itemName, enabled, provider}) => {
  let url;

  switch(provider){
    case "AMAZON_FRESH":
      url = "https://www.amazon.com/s?" + "k=" + formQueryString(itemName) + "&i=amazonfresh";
      break;
    case "AVO":
      url = "https://www.avonow.com/search?q=" + itemName;
      break;
    case "INSTACART":
      url = "https://www.instacart.com/store/search/" + itemName; 
      break;
    case "WALMART_GROCERY":
      url = "https://www.walmart.com/search?q=" + itemName;
      break;
    case "WHOLE_FOODS":
      url = "https://www.amazon.com/s?k=" + formQueryString(itemName) +"&i=wholefoods";
      break;
  }

  if(!enabled){
    return <div></div>;
  }

  return (
    <TableCell style={{width: "20px"}}>
        <a href={url} target="_blank" rel='noreferrer'>
          <AddShoppingCartIcon />
        </a>
    </TableCell>
  );
}

const IngredientTable = ({data, shoppingModeToggled, shoppingProvider}) => {

    const section = data[0].section;

    return (
        <TableContainer component={Paper}>
        <Table  aria-label="caption table">
          <caption style={{textAlign: 'center'}}>{section}</caption>
          <TableBody>
            {data.map((ingredient) => (
              <TableRow key={section + "." + ingredient.name}>
                <LinkedShoppingCart itemName={ingredient.name} enabled={shoppingModeToggled} provider={shoppingProvider} />
                <TableCell align="left"
                style={{paddingLeft: "5%", paddingRight: "5%"}}>
                  <strong>{ingredient.amount}</strong> &nbsp; 
                  {ingredient.unit}&nbsp;
                  {ingredient.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 

    );
}

export default IngredientTable;