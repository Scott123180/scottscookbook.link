import React from 'react'
import Link from 'gatsby-link'
import {GatsbyImage, getImage} from "gatsby-plugin-image"

const FeaturedBlog = ({ data }) => {
  return (
    <div className="featured-blog-container">
      {data.edges.filter(({node}) => node.frontmatter.topic === "feature").map(
        ({node}) => (
          <Link key={node.id} to={node.fields.slug} style={{ textDecoration: 'none', color: 'inherit'}}>
            <div className="featured-blog-card">
              <GatsbyImage className="featured-blog-thumbnail" image={getImage(data.frontmatter.image)} />
              <div className="featured-blog-description">
                <h3 className="featured-blog-title">{node.frontmatter.title}</h3>
                <p className="featured-blog-excerpt">{node.excerpt}</p> 
                <p className="featured-read-more">Read More - {node.frontmatter.read}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default FeaturedBlog;