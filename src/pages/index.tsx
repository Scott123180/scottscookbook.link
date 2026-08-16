import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import RecipeList from "../components/RecipeList";

const IndexPage = ({ data }) => (
    <Layout>
        <SEO title="ScottsCookbook" />

        <div
          style={{
            background: "#4a7c3f",
            padding: "40px 5% 32px",
            color: "#fffdf9",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 1.2rem + 2vw, 2.1rem)",
                margin: "0 0 8px",
                lineHeight: 1.15,
              }}
            >
              A personal, ad-free cookbook.
            </h1>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "15px",
                margin: 0,
                color: "rgba(255,253,249,0.85)",
                lineHeight: 1.6,
              }}
            >
              Recipes I've actually made, rated honestly, with shopping-list
              links and a cooking mode that keeps your screen awake.
            </p>
          </div>
        </div>

      <div style={{marginLeft: "5%", marginRight:"5%", marginTop: "28px"}}>
        <RecipeList data={data.blog}/>
      </div>
    </Layout>
);

export default IndexPage;

export const query = graphql`
{
  blog: allMarkdownRemark(
    sort: {frontmatter: {date: ASC}}
    filter: {fileAbsolutePath: {regex: "/recipes/"}}
  ) {
    edges {
      node {
        fields { slug }
        id
        frontmatter {
          title
          scottRating
          prepTime
          date
          totalTime
          topic
          ingredients {
            name
          }
          directions
          image {
            childImageSharp {
              gatsbyImageData(
                width: 600
                height: 600
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
}
`
