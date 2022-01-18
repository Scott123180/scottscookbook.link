import React from 'react';
import { Autocomplete, 
    TextField, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    Button,
    Switch } from '@mui/material';

const options = [
    { label: 'Black', id: 1 },
    { label: 'ChickPeas / Garbanzo', id: 2},
    { label: 'Pinto', id: 3},
    { label: 'Kidney', id: 4},
    { label: 'Cannelli', id: 5},
    { label: 'Lentil', id: 6},
    { label: 'Jelly', id: 7},
];

const BeanSelector = (
    <Autocomplete
    disablePortal
    id="bean-combo-box"
    options={options}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Bean / Legume Type" />}
    />
);

const BeanStyle = (
    <div>
        <p>Bean Style</p>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="dried"
            name="radio-buttons-group"
            row
        >
            <FormControlLabel value="dried" control={<Radio />} label="Dried" />
            <FormControlLabel value="canned" control={<Radio />} label="Canned" />
            <FormControlLabel value="cooked" control={<Radio />} label="Cooked" />
        </RadioGroup>
    </div>
);

const BeanQuantity = (

    <div>
        <p>qty</p>
        <TextField id="standard-basic" label="Quantity" variant="standard" type="number" />
    </div>


);

//generate the options based off of the bean style
const MeasurementUnit = (
    <div>
        <p></p>
        <p>Unit</p>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="one"
            name="radio-buttons-group"
            row
        >
            <FormControlLabel value="one" control={<Radio />} label="Cups" />
            <FormControlLabel value="two" control={<Radio />} label="Ounce" />
            <FormControlLabel value="three" control={<Radio />} label="Fluid Ounce" />
        </RadioGroup>
    </div>
);

const BeanConverter = () => {

    //extend this so that I can eventually convert it when in a recipe
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <div>
            <p></p>
            <p>This part of the website is under development. Check back soon!</p>
            <h1>Bean Converter</h1>
            <Switch {...label} /> {/* On toggle switch between metric / imperial */}

            <p>Recipe Calls for</p>

            {BeanSelector}
            {BeanStyle}
            {BeanQuantity}
            {MeasurementUnit}

            <Button variant="contained">Calculate</Button>

            {/* dried, cooked, cans --- volume / weight */}
            <p>results --- converted to other formats</p>
            <p>include--substitutes (separate tool)</p>

        </div>


    );
}

export default BeanConverter;