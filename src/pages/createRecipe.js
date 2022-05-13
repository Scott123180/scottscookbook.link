import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/Seo';


import HowTo from '../components/recipeCreator/HowToCreateRecipe';
import UsdaApiKey from '../components/recipeCreator/UsdaApiKey';
import IngredientCard from '../components/recipeCreator/IngredientCard';

import foodSearch from '../components/recipeCreator/APIQueries';

import { TextField, Button } from '@mui/material'
import QueryResults from '../components/recipeCreator/QueryResults';


class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "apiKey": "",
            "searchQuery": "",
            "content": {},
            "ingredients": [],
            "ingredientIncrementor": 0
        }
    }

    updateAPIKey = (value) => {
        this.setState({ "apiKey": value });
    }

    updateContent = (value) => {
        this.setState({ "content": value });
    }

    updateState = (key, value) => {

        this.setState({ [[key]]: value });
    }

    addIngredient = (foodInformation) => {

        this.setState(
            {
                ingredients: [...this.state.ingredients,
                { ingredientIncrementorNumber: this.state.ingredientIncrementor++, foodInformation: foodInformation, selectedFoodMeasure: '' }]
            }
        );

        //TODO
    }

    removeIngredientCallBack = (ingredientIncrementorNumber) => {
        //TODO: we'll set the object to null - this way we can still quickly index all the other elements

    }


    //TODO: optimize this
    //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    updateIngredientCallBack = (ingredientIncrementorNumber, key, value) => {

        const ingredients = [...this.state.ingredients];

        const ingredientIndex = ingredientIncrementorNumber;

        const ingredient = ingredients[ingredientIndex];

        ingredient[key] = value;

        this.setState({ ingredients });
    }

    saveRecipe = () => {

        //TODO - remember to filter out null values (ingredients we've removed)

    }

    resetForm = () => {

        //TODO
    }

    search = (pageNumber) => {
        //TODO: remove comment - I'm a n00b so it's helpful now but will remove in the future
        //async callback so component can update when promise is resolved
        foodSearch(this.state.apiKey, this.state.searchQuery, pageNumber, (cb) => this.updateContent(cb))
    }

    render() {

        const numberOfResults = Object.keys(this.state.content).length === 0 ? 0 : this.state.content.totalHits;

        const cards = this.state.ingredients.map((ingredient) => (
            <IngredientCard ingredient={ingredient} />

        ));

        return (
            <Layout>
                <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <SEO title="Create Recipe" />
                    <h1>Under Construction!</h1>
                    <HowTo />
                    <br />

                    <UsdaApiKey callback={(value) => this.updateAPIKey(value)} />

                    <br />
                    <TextField id="standard-basic" label="Food Search" variant="standard" onChange={event => this.updateState('searchQuery', event.target.value)} />
                    <Button variant="contained" onClick={() => this.search(1)}>Search</Button>


                    <p>{this.state.apiKey}</p>
                    <p>Number of results: {numberOfResults}</p>
                    {cards}

                    <QueryResults
                        data={this.state.content}
                        updatePageCallBack={(pageNumber) => this.search(pageNumber)}
                        addIngredientCallBack={(fdcId) => this.addIngredient(fdcId)}

                    />

                    <Button variant="contained" onClick={() => this.saveRecipe()}>Save Recipe</Button>


                    <p>{JSON.stringify(this.state.content)}</p>
                </div>
            </Layout>
        );
    }
}

export default Create;