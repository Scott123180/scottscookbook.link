import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TextField } from '@mui/material';


const RecipeSections = (props) => {

    const sectionItems = props.sections.map((section, index) => (
            <ListItem key={section}>
                <ListItemIcon>
                    <DeleteIcon onClick={() => props.deleteSectionCallBack(index)}/>
                </ListItemIcon>
                <TextField 
                value={section} 
                style={{ width: 200 }}
                onChange={(event) => props.updateSectionCallBack(index, event.target.value)}
                />
            </ListItem>
    ));

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Recipe Sections
            </Typography>
            <List>
                {sectionItems}
            </List>
            Add section <AddBoxIcon onClick={() => props.addSectionCallBack()} />
        </Grid>
    );

}

export default RecipeSections;