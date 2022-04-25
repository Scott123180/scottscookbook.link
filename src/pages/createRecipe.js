import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

class Create extends React.Component {
    render (){
        return (
            <Layout>
                <div style={{marginLeft: "5%", marginRight:"5%"}}>
                        <SEO title="Create Recipe" />
                        <h1>Under Construction!</h1>
                        <p>Welcome to this part of the site! Follow the steps below create your own recipe.</p>
                        <ol>
                            <li>Go to <a href="https://fdc.nal.usda.gov/api-key-signup.html" target="_blank" rel="noreferrer">USDA Food Central API Key Signup</a></li>
                            <li>Enter your API key into the form. (this is used to query the food database)</li>
                            <li>Enter in your recipe details.</li>
                            <li>Export your recipe. I'm not taking many recipe requests, but if I make it and like it, raise a PR on Github&nbsp;
                                <a href="https://github.com/Scott123180/scottscookbook.link/pulls" target="_blank" rel="noreferrer">here</a>
                            </li>
                        </ol>
                </div>
            </Layout>
        );
    }
}

export default Create;