import { Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';

interface MyProps {
    ingredient: any,
    updateIngredientCallBack: Function,
    sections: string[]
}

class IngredientCard extends React.Component<MyProps, {}> {

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {

        const servingMenuOptions = this.props.ingredient.foodInformation.foodMeasures.map((measure: any, index: number) => (
            <MenuItem value={index} key={measure.id}
            >
                {measure.disseminationText} ({measure.gramWeight}g)
            </MenuItem>
        ));

        const foodMeasureSelect = (
            <Select
                labelId="ingredient-food-measure-select"
                id="food-measure-select"
                label="Food Measure"
                value={this.props.ingredient.selectedFoodMeasure}
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'selectedFoodMeasure', event.target.value)
                }
            >
                {servingMenuOptions}
            </Select>

        );

        const servingUnitTextField = (
            <TextField
                id="serving-unit-text-id"
                label="Serving Unit"
                variant="standard"
                type="number"
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'servingUnitInput', event.target.value)
                }
            />
        );

        const foodUnitSelect = (
            <Select
                labelId="ingredient-unit-select"
                id="food-unit-select"
                label="Serving Unit"
                value={this.props.ingredient.selectedIngredientUnit}
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'selectedIngredientUnit', event.target.value)
                }
            >
                <MenuItem value={0} key={'servings'}>serving(s)</MenuItem>
                <MenuItem value={1} key={'g'}>g</MenuItem>
            </Select>

        );

        const preparationTextField = (
            <TextField
                id="preparation-text-id"
                label="Preparation"
                variant="standard"
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'preparationInput', event.target.value)
                }
            />
        );

        const sectionSelection = (

            <Select
                labelId="section-select"
                id="section-select"
                label="Recipe Section"
                value={this.props.ingredient.section}
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'section', event.target.value)
                }
            >
                {this.props.sections.map((section, index) => (
                    <MenuItem value={index}>{section}</MenuItem>
                ))}
            </Select>
        );

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">{this.props.ingredient.foodInformation.description}</Typography>

                    Food Measure: {foodMeasureSelect}

                    <br />

                    {servingUnitTextField}
                    {foodUnitSelect}

                    <br />

                    {preparationTextField}

                    <br />

                    Recipe Section: {sectionSelection}

                </CardContent>
            </Card >
        );
    }
}

export default IngredientCard;