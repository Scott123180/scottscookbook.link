import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import RecipeList from "../components/RecipeList";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = ({ data }) => (
    <Layout>
      <div style={{marginLeft: "5%", marginRight:"5%"}}>
        <SEO title="ScottsCookbook" />
        <StaticImage src="../images/default.png" 
                    grayscale="true" 
                    placeholder="blurred" 
                    alt="" 
                    loading="eager"
                    layout="constrained" 
                    style={{marginTop: "20px", marginBottom: "20px"}}/>
        <RecipeList data={data.blog}/>
      </div>
    </Layout>
);

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
          scottRating
          prepTime
          date
          totalTime
          topic
        }
        excerpt(pruneLength: 200)
      }
    }
  }
}
`