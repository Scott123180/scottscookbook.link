import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

class Create extends React.Component {
    render (){
        return (
            <Layout>
                <div style={{marginLeft: "5%", marginRight:"5%"}}>
                        <SEO title="Create Recipe" />
                        <p>create your recipe!</p>
                </div>
            </Layout>
        );
    }
}

export default Create;