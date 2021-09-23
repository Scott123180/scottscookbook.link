import React from 'react'
import Link from 'gatsby-link'
import {GatsbyImage, getImage} from "gatsby-plugin-image"

const RecipeList = ({ data }) => {
  return (
    <div className="blog-container">
      {data.edges.filter(({node}) => node.frontmatter.topic !== "feature").map(
        ({node}) => (
          <Link key={node.id} to={node.fields.slug} style={{ textDecoration: 'none', color: 'inherit'}}>
            <div className="blog-card">
              <div className="blog-description">
                <h3 className="blog-title">{node.frontmatter.title}</h3>
                <p className="blog-excerpt">{node.excerpt}</p> 
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default RecipeList;