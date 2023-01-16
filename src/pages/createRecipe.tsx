import { Button, TextField } from '@mui/material';
import * as React from "react";
import update from 'immutability-helper';
import Layout from '../components/Layout';
import foodSearch from '../components/recipeCreator/APIQueries';
import HowTo from '../components/recipeCreator/HowToCreateRecipe';
import IngredientCard from '../components/recipeCreator/IngredientCard';
import QueryResults from '../components/recipeCreator/QueryResults';
import UsdaApiKey from '../components/recipeCreator/UsdaApiKey';
import Seo from '../components/Seo';
import aggregateNutrition from '../components/recipeCreator/AggregateNutrition';
import RecipeDirections from '../components/recipeCreator/RecipeDirections';
import HoverRating from '../components/recipeCreator/HoverRating';
import RecipeSections from '../components/recipeCreator/RecipeSections';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

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

interface MyState {
    apiKey : string,
    searchQuery: string,
    foodApiContent: any,
    ingredients: any[],
    ingredientIncrementor: number,
    sectionIncrementor: number,
    directionIncrementor: number,
    recipeTitle: string,
    preparationTime: string,
    cookingTime: string,
    directions: any[],
    cookingNotes: string[],
    rating: number,
    sections: any[],
    recipeDate: Date,
    recipeTopic: string,
    originalLink: string

}

class CreateRecipe extends React.Component<{}, MyState> {

    constructor(props: any) {
        super(props);

        this.state = {
            apiKey: "mnk6fopkXTbgSTqJpylXBuHnC4LPAqzqYLtSUVbs",
            searchQuery: "",
            foodApiContent: {},
            ingredients: [],
            ingredientIncrementor: 0,
            sectionIncrementor: 1,
            directionIncrementor: 1,
            recipeTitle: "",
            preparationTime: "",
            cookingTime: "",
            directions: [{directionIncrementor: 0, directionText: ""}],
            cookingNotes: [],
            rating: 0,
            sections: [{sectionIncrementor: 0, sectionText: ""}],
            recipeDate: new Date(),
            recipeTopic: '',
            originalLink: ''
        }
    }


    updateAPIKey = (value: string) => {
        this.setState({ apiKey: value });
    }

    updateContent = (value: any) => {
        this.setState({ foodApiContent: value });
    }

    addIngredientAndGetReadyForNextQuery = (foodInformation: any) => {

        const ingredientIncrementorValue = this.state.ingredientIncrementor;

        this.setState(
            {
                ingredients:
                    [...this.state.ingredients,
                    {
                        ingredientIncrementorNumber: ingredientIncrementorValue,
                        foodInformation: foodInformation,
                        selectedFoodMeasure: 0,
                        selectedIngredientUnit: 0,
                        section: 0,
                        preparationInput: '',
                        servingUnitInput: '',
                    }],
                foodApiContent: {},
                searchQuery: "",
                ingredientIncrementor: (ingredientIncrementorValue + 1)
            }
        );
    }

    removeIngredientCallBack = (ingredientIncrementorNumber: number) => {
        //TODO: we'll set the object to null - this way we can still quickly index all the other elements
        const clone = [...this.state.ingredients]
        .filter(e => e.ingredientIncrementorNumber !== ingredientIncrementorNumber);

        this.setState({ingredients: clone});
    }

    updateDirectionCallBack = (directionIndex: number, text: string) => {

        const clone = [...this.state.directions];
        clone[directionIndex].directionText = text;

        this.setState({ directions: clone });
    }

    addDirectionCallBack = () => {

        const directionIncrementorValue = this.state.directionIncrementor;

        this.setState(
            {
                directions:
                    [...this.state.directions,
                    {
                        directionIncrementor: directionIncrementorValue,
                        directionText: ""
                    }],
                directionIncrementor: (directionIncrementorValue + 1)
            }
        );
    }

    deleteDirectionCallBack = (directionIndex: number) => {

        const clone = [...this.state.directions];
        clone.splice(directionIndex, 1);

        this.setState({
            directions: clone
        });
    }

    updateSectionCallBack = (sectionIndex: number, text: string) => {

        const clone = [...this.state.sections];
        clone[sectionIndex].sectionText = text;

        this.setState({ sections: clone });
    }

    addSectionCallBack = () => {

        const sectionIncrementorValue = this.state.sectionIncrementor;

        this.setState(
            {
                sections:
                    [...this.state.sections,
                    {
                        sectionIncrementor: sectionIncrementorValue,
                        sectionText: ""
                    }],
                sectionIncrementor: (sectionIncrementorValue + 1)
            }
        );
    }

    deleteSectionCallBack = (sectionIndex: number) => {

        const clone = [...this.state.sections];
        clone.splice(sectionIndex, 1);

        this.setState({
            sections: clone
        });
    }

    updateIngredientCallBack = (ingredientIncrementorNumber: number, key: any, value: any) => {

        this.setState((prevState) => update(prevState, {
            ingredients: {
                [ingredientIncrementorNumber] : {
                    [key] : {$set : value}
                }
            }
        }))

    }

    updateRatingCallBack = (newRating: number) => {
        this.setState({ rating: newRating });
    }

    saveRecipe = () => {

        const nutritionInformation = aggregateNutrition(this.state.ingredients);

    }

    resetInput = () => {
        this.setState({
            "searchQuery": "",
            "foodApiContent": {}
        });
    }

    resetForm = () => {

        //TODO
    }

    search = (pageNumber: number) => {
        foodSearch(this.state.apiKey, this.state.searchQuery, pageNumber, (cb: any) => this.updateContent(cb))
    }

    render() {

        const cards = this.state.ingredients.map((ingredient) => (
            <IngredientCard
                ingredient={ingredient}
                sections={this.state.sections}
                updateIngredientCallBack={(ingredientIncrementorNumber: number, key: string, value: any) => this.updateIngredientCallBack(ingredientIncrementorNumber, key, value)}
                removeIngredientCallBack={(ingredientIncrementorNumber: number) => this.removeIngredientCallBack(ingredientIncrementorNumber)}
            />
        ));

        return (
            <Layout>
                <div style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <Seo title="Create Recipe" />
                    <h2>Create Recipe</h2>
                    <HowTo />
                    <br />

                    <UsdaApiKey callback={(value: string) => this.updateAPIKey(value)} />
                    <p>{this.state.apiKey}</p>


                    <TextField id="recipe-title-textfield" label="Recipe Title" variant="standard" value={this.state.recipeTitle} onChange={event => this.setState({ recipeTitle: event.target.value })} />
                    <br />
                    <TextField id="preparation-time-textfield" label="Preparation Time (minutes)" variant="standard" type="number" value={this.state.preparationTime} onChange={event => this.setState({ preparationTime: event.target.value })} />
                    <br />
                    <TextField id="cooking-time-textfield" label="Cooking Time (minutes)" variant="standard" type="number" value={this.state.cookingTime} onChange={event => this.setState({ cookingTime: event.target.value })} />

                    <br />
                    <br />
                    <DatePicker selected={this.state.recipeDate} onChange={(date: Date) => this.setState({recipeDate :date})} />
                    <br />
                    <br />
                    
                    <TextField id="recipe-topic-textfield" label="Recipe Topic" variant="standard" value={this.state.recipeTopic} onChange={event => this.setState({ recipeTopic: event.target.value })} />
                    <br />
                    <TextField id="original-link-textfield" label="Original Link" variant="standard" value={this.state.originalLink} onChange={event => this.setState({ originalLink: event.target.value })} />
                    <br />


                    {/*TODO: get the state from this component */}
                    <HoverRating updateRatingCallBack={(rating: number) => this.updateRatingCallBack(rating)} />


                    <RecipeSections
                        sections={this.state.sections}
                        deleteSectionCallBack={(sectionIndex: number) => this.deleteSectionCallBack(sectionIndex)}
                        updateSectionCallBack={(sectionIndex: number, text: string) => this.updateSectionCallBack(sectionIndex, text)}
                        addSectionCallBack={() => this.addSectionCallBack()}
                    />

                    <br />
                    <br />
                    <TextField id="standard-basic" label="Food Search" variant="standard" value={this.state.searchQuery} onChange={event => this.setState({ searchQuery: event.target.value })} />
                    <Button variant="contained" onClick={() => this.search(1)}>Search</Button>


                    <QueryResults
                        data={this.state.foodApiContent}
                        updatePageCallBack={(pageNumber: number) => this.search(pageNumber)}
                        addIngredientCallBack={(foodInformation: any) => this.addIngredientAndGetReadyForNextQuery(foodInformation)}
                    />

                    {cards}

                    <br />

                    <RecipeDirections
                        directions={this.state.directions}
                        deleteDirectionCallBack={(directionIndex: number) => this.deleteDirectionCallBack(directionIndex)}
                        updateDirectionCallBack={(directionIndex: number, text: string) => this.updateDirectionCallBack(directionIndex, text)}
                        addDirectionCallBack={() => this.addDirectionCallBack()}
                    />

                    <br />

                    <Button variant="contained" onClick={() => this.saveRecipe()}>Save Recipe</Button>


                    <p>{JSON.stringify(this.state.foodApiContent)}</p>
                </div>
            </Layout>
        );
    }
}

export default CreateRecipe;