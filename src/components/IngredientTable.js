import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const LinkedShoppingCart = ({link}) => {

  const url = "https://www.amazon.com/s?"
  + "k=" + link.replace(/\s/g, "+") 
  + "&i=amazonfresh";

  return (
    <div>
        <a href={url} target="_blank" rel='noreferrer'>
          <AddShoppingCartIcon />
        </a>
    </div>
  );

}

const IngredientTable = ({data}) => {

    const section = data[0].section;

    return (
        <TableContainer component={Paper}>
        <Table  aria-label="caption table">
          <caption style={{textAlign: 'center'}}>{section}</caption>
          <TableBody>
            {data.map((ingredient) => (
              <TableRow key={section + "." + ingredient.name}>
                <TableCell style={{width: "20px"}}>
                  <LinkedShoppingCart link={ingredient.name} />
                </TableCell>
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