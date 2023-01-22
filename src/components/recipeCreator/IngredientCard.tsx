import { Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';

interface MyProps {
    ingredient: any,
    updateIngredientCallBack: Function,
    removeIngredientCallBack: Function,
    sections: string[]
}

class IngredientCard extends React.Component<MyProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {

        const servingMenuOptions: any[] = this.props.ingredient.foodInformation.foodMeasures.map((measure: any, index: number) => (
            <MenuItem value={index} key={measure.id}>
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
                label="Number of Servings"
                variant="standard"
                type="number"
                onChange={(event) =>
                    this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'servingUnitInput', event.target.value)
                }
            />
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
                {this.props.sections.map((section: any, index: number) => (
                    <MenuItem value={index}>{section.sectionText}</MenuItem>
                ))}
            </Select>
        );

        const removeIngredient = (
                <ListItemIcon>
                    <DeleteIcon onClick={() => this.props.removeIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber)}/>
                </ListItemIcon>
        );

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">{this.props.ingredient.foodInformation.description}</Typography>
                    <Typography variant="body2" component="div"><em>Additional descriptions:</em> {this.props.ingredient.foodInformation.additionalDescriptions}</Typography>
                    <Typography variant="body2" component="div"><em>Food Category:</em> {this.props.ingredient.foodInformation.foodCategory}</Typography>
                    

                    Food Measure: {foodMeasureSelect}

                    <br />

                    {servingUnitTextField}
                    {this.props.ingredient.servingUnitInput * this.props.ingredient.foodInformation.foodMeasures[this.props.ingredient.selectedFoodMeasure].gramWeight}

                    <br />

                    {preparationTextField}

                    <br />

                    Recipe Section: {sectionSelection}
                    {removeIngredient}

                </CardContent>
            </Card >
        );
    }
}

export default IngredientCard;