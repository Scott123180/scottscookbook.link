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
    Typography, 
    FormLabel} from '@mui/material';

const imperial = "imperial";
const metric = "metric";

const beanMap = new Map([
    [1,{name: 'Black'}],
    [2,{name: 'ChickPeas / Garbanzo'}],
    [3,{name: 'Pinto'}],
    [4,{name: 'Kidney'}],
    [5,{name: 'Cannelli'}],
    [6,{name: 'Lentil'}],
    [7,{name: 'Jelly'}],
])

const beanOptions = Array.from(beanMap, ([key, value]) => ({label: value.name, id: key}))

const BeanSelector = (callBackUpdate) => {

    return (
        <Autocomplete
        disablePortal
        id="bean-combo-box"
        options={beanOptions}
        sx={{ width: 300 }}
        onChange={(event, value) => callBackUpdate(value !== null ? value.id : undefined)}
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
                name="radio-buttons-group"
                onChange={(event, value) => console.log(value)}
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
            <TextField 
            id="standard-basic" 
            label="Quantity" 
            variant="standard" 
            type="number"
            onChange={(event) => console.log(event.target.value)} />
        </div>
    );

};


const metricOptions = () => {

    return (
        <div>
            <FormControlLabel value="ml" control={<Radio />} label="ml" />
            <FormControlLabel value="grams" control={<Radio />} label="grams" />
        </div>
    );

}
const imperialOptions = () => {
    return (
        <div>
            <FormControlLabel value="cups" control={<Radio />} label="Cups" />
            <FormControlLabel value="ounce" control={<Radio />} label="Ounce" />
            <FormControlLabel value="fluidOunce" control={<Radio />} label="Fluid Ounce" />
        </div>
    );

}

//generate the options based off of the bean style
const MeasurementUnit = (systemOfUnits, callBackUpdate) => {

    const formOptions = systemOfUnits === imperial ? imperialOptions() : metricOptions();

    return (
        <div>
            <p></p>
            <p>Unit</p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event, value) => console.log(value)}
                row
            >
                {formOptions}
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
            systemOfUnits: imperial,
            pulseType: undefined,
            pulseStyle: undefined,
            quantity: "",
            measurementUnit: ""
        }
    }

    updateState = (key,value) => {
        console.log("updating state");
        console.log("key: " + key);
        console.log("value " + value);
        this.setState({[[key]]: value});
    }

    updateMetricState = (value) => {
        if(value === false){
            this.updateState("systemOfUnits", imperial);
        } else {
            this.updateState("systemOfUnits", metric);
        }
    }

    render() {

        const onSubmit = () => {
            console.log("submitted it!");
            console.log(this.state.systemOfUnits);
            console.log(this.state.pulseType);
            console.log(this.state.pulseStyle);
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
                    {MeasurementUnit(this.state.systemOfUnits)}

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
                <p>Pulse (bean) type: {this.state.pulseType !== undefined ? beanMap.get(this.state.pulseType).name : ""}</p>
                <p>Pulse (bean) style: {this.state.pulseStyle !== undefined ? beanMap.get(this.state.pulseStyle).name : ""}</p>
                <p>Quantity: {this.state.quantity}</p>
                <p>MeasurementUnit: {this.state.measurementUnit}</p>

                <p>include--substitutes (separate tool)</p>

            </div>
        );
    }
}

export default BeanConverter;