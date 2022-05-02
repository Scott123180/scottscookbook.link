import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';


import HowTo from '../components/recipeCreator/HowToCreateRecipe';
import UsdaApiKey from '../components/recipeCreator/UsdaApiKey';

class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "apiKey": undefined
        }
    }

    updateAPIKey = (value) => {
        this.setState({"apiKey" : value});

    }

    updateState = (key,value) => {

        this.setState({[[key]]: value});
    }


    render (){
        return (
            <Layout>
                <div style={{marginLeft: "5%", marginRight:"5%"}}>
                        <SEO title="Create Recipe" />
                        <h1>Under Construction!</h1>
                        <HowTo />
                        <br />

                        <UsdaApiKey callback={(value) => this.updateAPIKey(value)} />

                        <p>{this.state.apiKey}</p>
                        

                </div>
            </Layout>
        );
    }
}

export default Create;