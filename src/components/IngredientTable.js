import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const IngredientTable = ({data}) => {

    const section = data[0].section;
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>{section}</caption>
          <TableHead>
            <TableRow>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell>Ingredient Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ingredient) => (
              <TableRow key={section + "." + ingredient.name}>
                <TableCell align="right">{ingredient.amount}</TableCell>
                <TableCell align="right">{ingredient.unit}</TableCell>
                <TableCell component="th" scope="row">
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