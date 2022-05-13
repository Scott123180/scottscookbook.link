import React from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { CardContent } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';

class IngredientCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    //TODO: I think we can remove this as a component

    menuOptions = (foodMeasures) => {

        foodMeasures.map((measure, index) => {
            console.log(measure);
            <MenuItem value={index} key={measure.id}
            >
                {measure.disseminationText}
            </MenuItem>
        })


    }

    render() {
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
                        //TODO
                        //onChange={handleChange}
                        >
                            {() => this.menuOptions(this.props.ingredient.foodInformation.foodMeasures)}
                        </Select>

                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default IngredientCard;