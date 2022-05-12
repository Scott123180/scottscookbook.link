import React from 'react';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import { CardContent } from '@mui/material';

class IngredientCard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {this.props.fdcId}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default IngredientCard;