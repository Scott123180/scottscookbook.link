import { Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';

class IngredientCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        const servingMenuOptions = this.props.ingredient.foodInformation.foodMeasures.map((measure, index) => (
            <MenuItem value={index} key={measure.id}
            >
                {measure.disseminationText} ({measure.gramWeight}g)
            </MenuItem>
        ));

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <p>{this.props.ingredient.ingredientIncrementorNumber}</p>
                        <p>{this.props.ingredient.foodInformation.description}</p>
                        <p>{this.props.ingredient.foodInformation.fdcId}</p>

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

                        <br />

                        <TextField id="standard-basic" label="ServingUnit" variant="standard" />
                        <Select
                            labelId="ingredient-unit-select"
                            id="food-unit-select"
                            label="Serving Unit"
                            value={0}
                        //TODO
                        // onChange={(event) =>
                        //     this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'selectedFoodMeasure', event.target.value)
                        // }
                        >
                            <MenuItem value={0} key={'servings'}>serving(s)</MenuItem>
                            <MenuItem value={1} key={'g'}>g</MenuItem>
                        </Select>

                        <br />

                        <TextField id="standard-basic" label="Preparation" variant="standard" />
                        <br />

                        <TextField id="standard-basic" label="Section" variant="standard" />



                    </Typography>
                </CardContent>
            </Card >
        );
    }
}

export default IngredientCard;