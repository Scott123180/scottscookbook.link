import React from 'react';
import { graphql } from 'gatsby';
import IngredientTable from '../components/IngredientTable';
import Grid from '@mui/material/Grid';
import Layout from '../components/Layout';
import { FormGroup, Typography, Switch, Stack, Select, MenuItem} from '@mui/material';
import {GatsbyImage, getImage} from "gatsby-plugin-image"

const RecipeLinkElement = ({link}) => {

  if(link !== null && link !== "") {
    return <p><a href={link} target="_blank" rel="noreferrer">Inspiring Recipe</a></p>
  }

  return <div></div>;

}

const ShoppingProvider = ({shoppingProvider, enabled, handleChange}) => {
  if(!enabled) return <div />

  return (
    <Select
      value={shoppingProvider}
      onChange={(event) => handleChange(event.target.value)}
    >
      <MenuItem value={'AMAZON_FRESH'}>Amazon Fresh</MenuItem>
      <MenuItem value={'AVO'}>Avo</MenuItem>
      <MenuItem value={'INSTACART'}>Instacart</MenuItem>
      <MenuItem value={'WALMART_GROCERY'}>Walmart Grocery</MenuItem>
      <MenuItem value={'WHOLE_FOODS'}>Whole Foods</MenuItem>
    </Select>

  )
}

class Recipe extends React.Component{

  constructor() {
    super();

    this.state = {
      shoppingModeToggled: false,
      shoppingProvider: 'AMAZON_FRESH'
    };
  }

  updateShoppingState = (value) => {
    this.updateState("shoppingModeToggled", value);
  }
  
  updateState = (key,value) => {
      this.setState({[[key]]: value});
  }


  render(){
    const data = this.props.data;
    const post = data.markdownRemark;

    const ingredientList = post.frontmatter.ingredients;
    
    const mapBySection = new Map();

    ingredientList.forEach((i) =>{
      const key = i.section;
      const value = mapBySection.get(key);
      if(value === undefined){
        mapBySection.set(key, [i]);
      } else {
        value.push(i);
      }
    });

    const out = [];
    mapBySection.forEach((key, value) => {
      out.push(
        <Grid container spacing = {2} className="ingredients">
          <Grid item xs = {1} md={2}/>
          <Grid item xs = {10} md={8}>
            <IngredientTable data={mapBySection.get(value)} shoppingModeToggled={this.state.shoppingModeToggled} shoppingProvider={this.state.shoppingProvider} />
          </Grid>
          <Grid item xs = {1} md={2} />
        </Grid>
      )
    });

    const ingredients = (
      <div>
        {out}
      </div>
    );

    const directionList = post.frontmatter.directions;
    const directions = (
      <ol>
        {
          directionList.map((i) => {
            return React.createElement(
              "li",
              {className:"direction"},
              i
            );
          })
        }

      </ol>
    );

    const imageData = getImage(post.frontmatter.image);

    return (
      <Layout>
        <div className="post-page-container">
          <div className="post-page-flex-container">
            <div className="post-content-container">
              <h1>{post.frontmatter.title}</h1>
              <h4 style={{color: 'rgb(165, 164, 164)', fontSize: '0.8em'}}>Published: {post.frontmatter.date} | Total Time: {post.frontmatter.totalTime}</h4>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  marginLeft: '10%',
                  marginRight: '10%'
                }}
              >
                <GatsbyImage image={imageData} alt="Your Alt Text" />
              </div>
              <br/>
              
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Shopping Mode</Typography>
                  <Switch label="Shopping Mode" onChange={(event, value) => this.updateShoppingState(value)} />
                  <ShoppingProvider 
                    shoppingProvider={this.state.shoppingProvider} enabled={this.state.shoppingModeToggled} 
                    handleChange={(value) => this.updateState("shoppingProvider", value)}
                    /> 
                </Stack>
              </FormGroup>

              <h4>Ingredients</h4>
              {ingredients}

              <h4>Directions</h4>
              {directions}

              <div dangerouslySetInnerHTML = {{ __html: post.html }}/>
              <RecipeLinkElement link={post.frontmatter.originalLink} />
            </div>
          </div>
          
        </div>
      </Layout>
    );

  }

} 

export default Recipe;

export const query = graphql`query PostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      date
      prepTime
      cookingTime
      totalTime
      originalLink
      ingredients {
        name
        preparation
        amount
        unit
        section
      }
      directions
      image {
        childImageSharp {
          gatsbyImageData(
            width: 1000
            layout: CONSTRAINED
          )
        }
      }
    }
  }
}`;