import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const BeanConverter = ({ data }) => (
    <Layout>
      <div style={{marginLeft: "5%", marginRight:"5%"}}>
            <SEO title="Bean Converter" />
            <p>can you see me?</p>
        </div>
    </Layout>
);

export default BeanConverter;