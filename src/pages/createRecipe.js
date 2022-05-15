import { Button, TextField } from '@mui/material';
import React from 'react';
import update from 'react-addons-update';
import Layout from '../components/Layout';
import foodSearch from '../components/recipeCreator/APIQueries';
import HowTo from '../components/recipeCreator/HowToCreateRecipe';
import IngredientCard from '../components/recipeCreator/IngredientCard';
import QueryResults from '../components/recipeCreator/QueryResults';
import UsdaApiKey from '../components/recipeCreator/UsdaApiKey';
import SEO from '../components/Seo';
import aggregateNutrition from '../components/recipeCreator/AggregateNutrition';

//TODO:
// 1. (medium) add section input for recipe so that we can select sections instead of entering them manually every time
// 2. (medium) delete ingredient
// 3. (low) delete ingredient undo
// 4. (high) aggregate nutrition
// 5. (medium) export recipe
// 6. (high) directions section
// 7. (low) add link to picture - we're absolutely not going to save pictures on our site - find free hosting
// 8. (low) styling
// 9. (very low) export recipe - auto create pull request

class CreateRecipe extends React.Component {

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

    addIngredientAndClearQueryResults = (foodInformation) => {

        this.setState(
            {
                ingredients:
                    [...this.state.ingredients,
                    {
                        ingredientIncrementorNumber: this.state.ingredientIncrementor++,
                        foodInformation: foodInformation,
                        selectedFoodMeasure: 0,
                        selectedIngredientUnit: 0
                    }],
                content: {}
            }
        );

        //TODO
    }

    removeIngredientCallBack = (ingredientIncrementorNumber) => {
        //TODO: we'll set the object to null - this way we can still quickly index all the other elements

    }


    updateIngredientCallBack = (ingredientIncrementorNumber, key, value) => {

        this.setState({
            ingredients: update(this.state.ingredients, { [[ingredientIncrementorNumber]]: { [[key]]: { $set: value } } })
        });
    }

    saveRecipe = () => {

        const nutritionInformation = aggregateNutrition(this.state.ingredients);
        console.log("nutrition information");
        console.log(nutritionInformation);

        //TODO - remember to filter out null values (ingredients we've removed)

    }

    resetInput = () => {
        this.setState({
            "searchQuery": "",
            "content": {}
        }); 
    }

    resetForm = () => {

        //TODO
    }

    search = (pageNumber) => {
        foodSearch(this.state.apiKey, this.state.searchQuery, pageNumber, (cb) => this.updateContent(cb))
    }

    render() {

        const numberOfResults = Object.keys(this.state.content).length === 0 ? 0 : this.state.content.totalHits;

        const cards = this.state.ingredients.reverse().map((ingredient) => (
            <IngredientCard
                ingredient={ingredient}
                updateIngredientCallBack={(ingredientIncrementorNumber, key, value) => this.updateIngredientCallBack(ingredientIncrementorNumber, key, value)}
            />

        ));

        return (
            <Layout>
                <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <SEO title="Create Recipe" />
                    <h2>Create Recipe</h2>
                    <HowTo />
                    <br />

                    <UsdaApiKey callback={(value) => this.updateAPIKey(value)} />
                    <p>{this.state.apiKey}</p>

                    <br />
                    <TextField id="standard-basic" label="Food Search" variant="standard" value={this.state.searchQuery} onChange={event => this.updateState('searchQuery', event.target.value)} />
                    <Button variant="contained" onClick={() => this.search(1)}>Search</Button>


                    <QueryResults
                        data={this.state.content}
                        updatePageCallBack={(pageNumber) => this.search(pageNumber)}
                        addIngredientCallBack={(foodInformation) => this.addIngredientAndClearQueryResults(foodInformation)}
                    />

                    {cards}

                    {/* <Button variant="contained" onClick={() => this.saveRecipe()}>Save Recipe</Button> */}
                    <Button variant="contained" onClick={() => this.resetInput()}>Clear Input</Button>


                    {/* <p>{JSON.stringify(this.state.content)}</p> */}
                </div>
            </Layout>
        );
    }
}

export default CreateRecipe;