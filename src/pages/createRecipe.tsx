import { Button, TextField } from '@mui/material';
import * as React from "react"
import update from 'react-addons-update';
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
    content: any,
    ingredients: any[],
    ingredientIncrementor: number,
    recipeTitle: string,
    preparationTime: string,
    cookingTime: string,
    directions: string[],
    cookingNotes: string[],
    rating: number,
    sections: string[],
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
            content: {},
            ingredients: [],
            ingredientIncrementor: 0,
            recipeTitle: "",
            preparationTime: "",
            cookingTime: "",
            directions: [''],
            cookingNotes: [],
            rating: 0,
            sections: [''],
            recipeDate: new Date(),
            recipeTopic: '',
            originalLink: ''
        }
    }


    updateAPIKey = (value: string) => {
        this.setState({ apiKey: value });
    }

    updateContent = (value) => {
        this.setState({ content: value });
    }

    addIngredientAndGetReadyForNextQuery = (foodInformation) => {

        const ingredientIncrementorValue = this.state.ingredientIncrementor + 1; 

        this.setState(
            {
                ingredients:
                    [...this.state.ingredients,
                    {
                        ingredientIncrementorNumber: ingredientIncrementorValue,
                        foodInformation: foodInformation,
                        selectedFoodMeasure: 0,
                        selectedIngredientUnit: 0,
                        section: 0
                    }],
                content: {},
                searchQuery: "",
                ingredientIncrementor: ingredientIncrementorValue 
            }
        );

        //TODO
    }

    removeIngredientCallBack = (ingredientIncrementorNumber) => {
        //TODO: we'll set the object to null - this way we can still quickly index all the other elements
    }

    updateDirectionCallBack = (directionIndex: number, text: string) => {

        const clone = [...this.state.directions];
        clone[directionIndex] = text;

        this.setState({ directions: clone });
    }

    addDirectionCallBack = () => {
        this.setState({ directions: [...this.state.directions, ''] })
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
        clone[sectionIndex] = text;

        this.setState({ sections: clone });
    }

    addSectionCallBack = () => {
        this.setState({ sections: [...this.state.sections, ''] })
    }

    deleteSectionCallBack = (sectionIndex: number) => {

        const clone = [...this.state.sections];
        clone.splice(sectionIndex, 1);

        this.setState({
            sections: clone
        });
    }

    updateIngredientCallBack = (ingredientIncrementorNumber: number, key, value) => {

        this.setState({
            ingredients: update(this.state.ingredients, { [[ingredientIncrementorNumber]]: { [[key]]: { $set: value } } })
        });
    }

    updateRatingCallBack = (newRating: number) => {
        this.setState({ rating: newRating });
    }

    saveRecipe = () => {

        const nutritionInformation = aggregateNutrition(this.state.ingredients);

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

        const cards = this.state.ingredients.map((ingredient) => (
            <IngredientCard
                ingredient={ingredient}
                sections={this.state.sections}
                updateIngredientCallBack={(ingredientIncrementorNumber, key, value) => this.updateIngredientCallBack(ingredientIncrementorNumber, key, value)}
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
                        data={this.state.content}
                        updatePageCallBack={(pageNumber: number) => this.search(pageNumber)}
                        addIngredientCallBack={(foodInformation) => this.addIngredientAndGetReadyForNextQuery(foodInformation)}
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


                    <p>{JSON.stringify(this.state.content)}</p>
                </div>
            </Layout>
        );
    }
}

export default CreateRecipe;