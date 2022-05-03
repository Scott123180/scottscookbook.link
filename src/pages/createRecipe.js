import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';


import HowTo from '../components/recipeCreator/HowToCreateRecipe';
import UsdaApiKey from '../components/recipeCreator/UsdaApiKey';

import foodSearch from '../components/recipeCreator/APIQueries';

class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "apiKey": "",
            "content" : {}
        }
    }

    updateAPIKey = (value) => {
        this.setState({"apiKey" : value});

        //TODO: remove comment - I'm a n00b so it's helpful now but will remove in the future
        //async callback so component can update when promise is resolved
        foodSearch(value, (cb) => this.updateContent(cb))
    }

    updateContent = (value) => {
        this.setState({"content" : value});
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

                        <p>{JSON.stringify(this.state.content)}</p>

                </div>
            </Layout>
        );
    }
}

export default Create;