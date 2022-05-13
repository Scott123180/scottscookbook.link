import React from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { CardContent } from '@mui/material';

class IngredientCard extends React.Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    //TODO: I think we can remove this as a component

    render() {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <p>{this.props.ingredient.ingredientIncrementorNumber}</p>
                        <p>{this.props.ingredient.fdcId}</p>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default IngredientCard;