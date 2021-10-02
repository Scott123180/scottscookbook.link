import React from "react";
import { graphql } from "gatsby"
import Nav from "../components/Nav"

const Post = ({ data }) => {
  const post = data.markdownRemark;

  const ingredientList = post.frontmatter.ingredients;
  const ingredients = (
    <ul>
      {
        ingredientList.map((i) => {
          return React.createElement(
            "li",
            {className:"ingredient"},
            i.amount + " " + i.unit + " " + i.name
          );
        })
      }

    </ul>
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

  
  return (
    <div>
      <Nav post={true}/>
        <div className="post-page-container">
          <div className="post-page-flex-container">
            <div className="post-content-container">
              <h1>{post.frontmatter.title}</h1>
              <h4 style={{color: 'rgb(165, 164, 164)', fontSize: '0.8em'}}>{post.frontmatter.date} - {post.frontmatter.totalTime}</h4>
              
              <h4>Ingredients</h4>
              {ingredients}

              <h4>Directions</h4>
              {directions}

              <div dangerouslySetInnerHTML = {{ __html: post.html }}/>
              <p><a href={post.frontmatter.originalLink} target="_blank" rel="noreferrer">Inspiring Recipe</a></p>
            </div>
          </div>
          
        </div>
    </div>
  );
};

export default Post;

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
        amount
        unit
      }
      directions
    }
  }
}`;