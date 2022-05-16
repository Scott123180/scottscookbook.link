import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemText } from '@mui/material';


const RecipeDirections = (props) => {

    const directionItems = props.directions.map((direction) => (
            <ListItem>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText
                    primary={direction}
                />
            </ListItem>
    ));

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Directions
            </Typography>
            <List>
                {directionItems}
                {/* <ListItem>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Single-line item"
                    />
                </ListItem>, */}
            </List>
        </Grid>
    );

}

export default RecipeDirections;