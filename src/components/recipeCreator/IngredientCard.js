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

                    </Typography>
                </CardContent>
            </Card >
        );
    }
}

export default IngredientCard;