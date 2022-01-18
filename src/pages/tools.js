import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import BeanConverter from "../components/BeanConverter";

const Tools = () => (
    <Layout>
      <div style={{marginLeft: "5%", marginRight:"5%"}}>
            <SEO title="Cooking Tools" />
            <BeanConverter  /> 
      </div>
    </Layout>
);

export default Tools;