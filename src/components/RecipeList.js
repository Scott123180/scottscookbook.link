import React from 'react';
import Link from 'gatsby-link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import '../styles/global.css';

const RecipeList = ({ data }) => {
  console.log(data); 
  return (
    <TableContainer component={Paper}>
    <Table  aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell style={{paddingLeft:'5%'}}>Recipe Name</TableCell>
          <TableCell>Rating</TableCell>
        </TableRow>
      </TableHead>
      {/* https://mui.com/components/tables/ */}
      <TableBody>
        {data.edges.map(
          ({node}) => (
          <TableRow
            key={node.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            component={Link}
            to={node.fields.slug}
            className='recipe-row'
            style={{ textDecoration: 'none', color: 'inherit'}}
          >
            <TableCell component="th" scope="row" style={{paddingLeft: '5%'}}>
              {node.frontmatter.title}
            </TableCell>
            <TableCell>
              <Rating value={node.frontmatter.scottRating} precision={0.5} readOnly/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default RecipeList;