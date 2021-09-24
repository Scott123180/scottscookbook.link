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

const RecipeList = ({ data }) => {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Rating</TableCell>
          <TableCell>Recipe Name</TableCell>
          <TableCell>Active Time</TableCell>
          <TableCell>Tags</TableCell>
        </TableRow>
      </TableHead>
      {/* https://mui.com/components/tables/ */}
      <TableBody>
        {data.edges.map(
          ({node}) => (
          <TableRow
            key={node.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {/* https://mui.com/components/rating/ */}
            <TableCell><Rating value={node.frontmatter.scottRating} precision={0.5} readOnly/></TableCell>
            <TableCell component="th" scope="row">
              {node.frontmatter.title}
            </TableCell>
            <TableCell>{node.frontmatter.prepTime}</TableCell>
            <TableCell>{node.carbs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

    // <div className="blog-container">
    //   {data.edges.filter(({node}) => node.frontmatter.topic !== "feature").map(
    //     ({node}) => (
    //       <Link key={node.id} to={node.fields.slug} style={{ textDecoration: 'none', color: 'inherit'}}>
    //         <div className="blog-card">
    //           <div className="blog-description">
    //             <h3 className="blog-title">{node.frontmatter.title}</h3>
    //             <p className="blog-excerpt">{node.excerpt}</p> 
    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    // </div>
  );
}

export default RecipeList;