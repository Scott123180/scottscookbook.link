import React from 'react';
import { Autocomplete, 
    TextField, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    FormControl,
    Button,
    Switch,
    Stack, 
    Typography } from '@mui/material';

//todo: load from graphql query
const beanOptions = [
    { label: 'Black', id: 1 },
    { label: 'ChickPeas / Garbanzo', id: 2},
    { label: 'Pinto', id: 3},
    { label: 'Kidney', id: 4},
    { label: 'Cannelli', id: 5},
    { label: 'Lentil', id: 6},
    { label: 'Jelly', id: 7},
];

const BeanSelector = (update) => {

    return (
        <Autocomplete
        disablePortal
        id="bean-combo-box"
        options={beanOptions}
        sx={{ width: 300 }}
        onChange={(event, value) => update(value)}
        renderInput={(params) => 
            <TextField {...params} label="Bean / Legume Type" />}
        />
    );
};

const BeanStyle = () => {

    return (
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
};

const BeanQuantity = () => {

    return (
        <div>
            <p>qty</p>
            <TextField id="standard-basic" label="Quantity" variant="standard" type="number" />
        </div>
    );

};

//generate the options based off of the bean style
const MeasurementUnit = () => {

    return (
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
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const imperialUnits = ["cup", "ounce", "fluid ounce"];
const metricUnits = ["ml", "grams"];

class BeanConverter extends React.Component {

    constructor() {
        super();
        
        this.state = {
            systemOfUnits: "imperial",
            pulseType: "",
            pulseStyle: "",
            quantity: "",
            measurementUnit: ""
        }
    }

    updateState = (key,value) => {
        this.setState({[[key]]: value});
    }

    updateMetricState = (value) => {
        if(value === false){
            this.updateState("systemOfUnits", "imperial");
        } else {
            this.updateState("systemOfUnits", "metric");
        }
    }

    render() {

        const onSubmit = () => {
            console.log("submitted it!");
            console.log(this.state.systemOfUnits);
            console.log(this.state.pulseType);
            console.log(this.state.quantity);
            console.log(this.state.measurementUnit);
        }

        return (
            <div>
                <p></p>
                <p>This part of the website is under development. Check back soon!</p>
                <h1>Bean Converter</h1>

                <FormControl>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Imperial</Typography>
                            <Switch onChange={(event, value) => this.updateMetricState(value)} />
                        <Typography>Metric</Typography>
                    </Stack>

                    <p>Recipe Calls for</p>

                    {BeanSelector((type) => this.updateState("pulseType", type))}
                    {BeanStyle()}
                    {BeanQuantity()}
                    {MeasurementUnit()}

                    <Button 
                        variant="contained" 
                        type="submit"
                        onClick={() => onSubmit()}
                    >
                        Calculate
                    </Button>
                </FormControl>

                {/* dried, cooked, cans --- volume / weight */}
                <p>results --- converted to other formats</p>

                <p><strong>Your selections: </strong></p>
                <p>System of units: {this.state.systemOfUnits}</p>
                <p>Pulse (bean) type: {this.state.pulseType}</p>
                <p>Quantity: {this.state.quantity}</p>
                <p>MeasurementUnit: {this.state.measurementUnit}</p>

                <p>include--substitutes (separate tool)</p>

            </div>
        );
    }
}

export default BeanConverter;