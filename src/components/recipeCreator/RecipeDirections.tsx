import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TextareaAutosize } from '@mui/material';


const RecipeDirections = (props) => {

    const directionItems = props.directions.map((direction, index) => (
            <ListItem>
                <ListItemIcon>
                    <DeleteIcon onClick={() => props.deleteDirectionCallBack(index)}/>
                </ListItemIcon>
                <TextareaAutosize 
                value={direction} 
                style={{ width: 200 }}
                onChange={(event) => props.updateDirectionCallBack(index, event.target.value)}
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
            </List>
            Add Direction <AddBoxIcon onClick={() => props.addDirectionCallBack()} />
        </Grid>
    );

}

export default RecipeDirections;