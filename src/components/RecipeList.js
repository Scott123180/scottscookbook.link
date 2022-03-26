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
import { Autocomplete, TextField } from '@mui/material';

class RecipeList extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        "data": props.data,
        "searchInput": null
      }

  }
  
  updateState = (key,value) => {

    this.setState({[[key]]: value});
  }

  render() {
    const allRecipes = this.state.data.edges.map(({node}) => node.frontmatter.title);

    return (
      <div>
        <TextField 
        id="standard-basic" 
        label="Recipe Search" 
        variant="standard" 
        onChange={(event) => this.updateState("searchInput", event.target.value)}
        style={{paddingBottom: "10px"}}
        />


        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{paddingLeft:'5%', fontWeight: 'bold'}}>Recipe Name</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>Scott's Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.edges.map(

              ({node}) => {
                if(this.state.searchInput && !node.frontmatter.title.includes(this.state.searchInput)){
                  return <div/>
                }

                return (
                  <TableRow
                    key={node.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    component={Link}
                    to={node.fields.slug}
                    className='recipe-row'
                    style={{ textDecoration: 'none', color: 'inherit'}}
                  >
                    <TableCell style={{paddingLeft: '5%'}}>
                      {node.frontmatter.title}
                    </TableCell>
                    <TableCell>
                      <Rating value={node.frontmatter.scottRating} precision={0.5} readOnly/>
                    </TableCell>
                  </TableRow>

                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }
}

export default RecipeList;