import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const options = [
    { label: 'Black', id: 1 },
    { label: 'ChickPeas / Garbanzo', id: 2},
    { label: 'Pinto', id: 3},
    { label: 'Kidney', id: 4},
    { label: 'Cannelli', id: 5},
    { label: 'Lentil', id: 6},
];

const BeanConverter = () => {

    //extend this so that I can eventually convert it when in a recipe

    return (
        <div>
            <p></p>
            <p>Recipe Calls for</p>
            <Autocomplete
            disablePortal
            id="bean-combo-box"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Bean / Legume Type" />}
            />

            <p>qty</p>
            <p>unit</p>
            <p>style --- cooked/canned/dry</p>

            <p>results --- converted to other formats</p>
            <p>include--substitutes</p>

        </div>


    );
}

export default BeanConverter;