import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import BlogCards from "../components/BlogCards"
import FeaturedBlog from "../components/FeaturedBlog"

const IndexPage = ({ data }) => {
  return(
    <Layout>
      <SEO title="EatWell" />
      <FeaturedBlog data={data.blog}/>
      <BlogCards data={data.blog}/>
    </Layout>
  );
}

export default IndexPage;


export const query = graphql`
{
  blog: allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC} 
    filter: { fileAbsolutePath: { regex: "/recipes/"}}
    ) {
    edges {
      node {
        fields {
          slug
        }
        id
        frontmatter {
          title
          date
          totalTime
          topic
          image {
            childImageSharp{
              gatsbyImageData(width:640)
            }
        }
        }
        excerpt(pruneLength: 200)
      }
    }
  }
}
`