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
    TableContainer, 
    Paper, 
    TableHead, 
    TableCell, 
    Table, 
    TableRow, 
    TableBody} from '@mui/material';

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

const BeanSelector = (callbackUpdate) => {

    return (
        <Autocomplete
        disablePortal
        id="bean-combo-box"
        options={beanOptions}
        sx={{ width: 300 }}
        onChange={(event, value) => callbackUpdate(value !== null ? value.id : undefined)}
        renderInput={(params) => 
            <TextField {...params} label="Bean / Legume Type" />}
        />
    );
};

const BeanStyle = (callbackUpdate) => {

    return (
        <div>
            <p>Bean Style</p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event, value) => callbackUpdate(value)}
                row
            >
                <FormControlLabel value="dried" control={<Radio />} label="Dried" />
                <FormControlLabel value="canned" control={<Radio />} label="Canned" />
                <FormControlLabel value="cooked" control={<Radio />} label="Cooked" />
            </RadioGroup>
        </div>
    );
};

const BeanQuantity = (callbackUpdate) => {

    return (
        <div>
            <TextField 
            id="standard-basic" 
            label="Quantity" 
            variant="standard" 
            type="number"
            onChange={(event) => callbackUpdate(event.target.value)} />
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
const MeasurementUnit = (callBackUpdate, measurementUnit, systemOfUnits) => {

    const formOptions = systemOfUnits === imperial ? imperialOptions(measurementUnit) : metricOptions();

    return (
        <div>
            <p></p>
            <p>Unit</p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event, value) => callBackUpdate(value)}
                value={measurementUnit}
                defaultChecked
                row
            >
                {formOptions}
            </RadioGroup>
        </div>

    );
};

const ResultTable = (systemOfUnits) => {
    const input = {
        dried: {
            imperial: {
                cup: 1,
                ounce: 2,
                fluidOz: 3
            },
            metric: {
                grams: 11,
                ml: 12
            }
        },
        canned: {
            imperial: {
                ounce: 4
            },
            metric: {
                grams: 5
            }
        },
        cooked: {
            imperial: {
                cup: 6,
                ounce: 7,
                fluidOz: 8,
            },
            metric: {
                grams: 9,
                ml: 10
            }
        }
    }

    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
                <TableRow key="one">
                    <TableCell variant="head">head</TableCell>
                    <TableCell>tailk</TableCell>
                </TableRow>
                <TableRow key="two">
                    <TableCell variant="head">head</TableCell>
                    <TableCell>tailk</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    

}

class BeanConverter extends React.Component {

    constructor() {
        super();
        
        this.state = {
            systemOfUnits: imperial,
            pulseType: undefined,
            pulseStyle: undefined,
            quantity: undefined,
            measurementUnit: ""
        }
    }

    updateState = (key,value) => {
        this.setState({[[key]]: value});
    }

    updateMetricState = (value) => {
        if(value === false){
            this.setState(
                {"systemOfUnits": imperial,
                "measurementUnit": ""
            });
        } else {
            this.setState(
                {"systemOfUnits": metric, 
                "measurementUnit": ""
            });
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
                    {BeanStyle((style) => this.updateState("pulseStyle", style))}
                    {BeanQuantity((quantity) => this.updateState("quantity", quantity))}
                    {MeasurementUnit((unit) => this.updateState("measurementUnit", unit),this.state.measurementUnit,this.state.systemOfUnits)}

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
                <p>Pulse (bean) style: {this.state.pulseStyle !== undefined ? this.state.pulseStyle : ""}</p>
                <p>Quantity: {this.state.quantity}</p>
                <p>MeasurementUnit: {this.state.measurementUnit}</p>

                {ResultTable(this.state.measurementUnit)}

                <p>include--substitutes (separate tool)</p>
            </div>
        );
    }
}

export default BeanConverter;