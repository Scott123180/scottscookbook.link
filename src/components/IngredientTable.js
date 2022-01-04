import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IngredientTable = ({data}) => {

    const section = data[0].section;

    return (
        <TableContainer component={Paper}>
        <Table  aria-label="caption table">
          <caption style={{textAlign: 'center'}}>{section}</caption>
          <TableBody>
            {data.map((ingredient) => (
              <TableRow key={section + "." + ingredient.name}>
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