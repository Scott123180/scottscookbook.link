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
import { ThreeDRotation } from '@mui/icons-material';

class RecipeList extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        "data": props.data,
        "searchInput": null
      }

  }
  
  updateState = (key,value) => {
    console.log(key);
    console.log(value);

    this.setState({[[key]]: value});
  }

  render() {
    const allRecipes = this.state.data.edges.map(({node}) => node.frontmatter.title);
    console.log(this.state.searchInput);

    return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allRecipes}
          onChange={(event, value) => this.updateState("searchInput", value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Recipe Search" />}
        />

        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{paddingLeft:'5%'}}>Recipe Name</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          {/* https://mui.com/components/tables/ */}
          <TableBody>
            {this.state.data.edges.map(
              ({node}) => {
                if(this.state.searchInput != null && this.state.searchInput != node.frontmatter.title){

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