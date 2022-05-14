import { Card, CardContent, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';

class IngredientCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        const menuOptions = this.props.ingredient.foodInformation.foodMeasures.map((measure, index) => (
            <MenuItem value={index} key={measure.id}
            >
                {measure.disseminationText}
            </MenuItem>
        ));

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <p>{this.props.ingredient.ingredientIncrementorNumber}</p>
                        <p>{this.props.ingredient.foodInformation.fdcId}</p>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Food Measure"
                            value={this.props.ingredient.selectedFoodMeasure}
                            onChange={(event) =>
                                this.props.updateIngredientCallBack(this.props.ingredient.ingredientIncrementorNumber, 'selectedFoodMeasure', event.target.value)
                            }
                        >
                            {menuOptions}
                        </Select>

                        <br />

                        {
                            //TODO: see what fitbit and other food entry apps do to select portions
                        }
                        <TextField id="standard-basic" label="Multiplier" variant="standard" />
                        <TextField id="standard-basic" label="Grams" variant="standard" />

                        <br />

                        <TextField id="standard-basic" label="Preparation" variant="standard" />

                    </Typography>
                </CardContent>
            </Card >
        );
    }
}

export default IngredientCard;