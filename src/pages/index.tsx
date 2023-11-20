import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import RecipeList from "../components/RecipeList";
import { StaticImage } from "gatsby-plugin-image";
import { Grid } from "@mui/material";

const IndexPage = ({ data }) => (
    <Layout>
        <SEO title="ScottsCookbook" />
         <Grid container>
            <Grid item xs={0} md={1} lg={2}/>
            <Grid item xs={12} md={10} lg={8}>
              <StaticImage src="../images/default.png" 
                          placeholder="blurred" 
                          alt="" 
                          loading="eager"
                          layout="constrained" 
                          style={{marginTop: "20px", marginBottom: "20px"}}
                          />
            </Grid>
            <Grid item xs={0} md={1} lg={2}/>
        </Grid> 

      <div style={{marginLeft: "5%", marginRight:"5%"}}>
        <RecipeList data={data.blog}/>
      </div>
    </Layout>
);

export default IndexPage;

export const query = graphql`
{
  blog: allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: ASC} 
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
          image {
            childImageSharp{
              gatsbyImageData(width: 200)
            }
          }
        }
      }
    }
  }
}
`