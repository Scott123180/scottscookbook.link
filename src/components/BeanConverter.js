import React from 'react';
import { Autocomplete, 
    TextField, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    FormControl,
    Switch,
    Stack, 
    Typography,
    TableContainer, 
    Paper, 
    TableCell, 
    Table, 
    TableRow, 
    TableBody} from '@mui/material';

const imperial = "imperial";
const metric = "metric";

//units in metrics
//measurements below start with dry weight and then we figure out the rest
//formula for cooked to canned g (assuming same density across all beans) --- cannedWeight = cookedWeight * 1 2/3
//formula for cooked to canned ml (assuming same amount of bean juice across all cans --- 

//source will either be serious eats or it will be my own observation
const beanMap = new Map([
    [1,{name: 'Black', cookedG: 1048.93, cannedG: 1748.22, dryG: 454, cookedMl: 1656.12, dryMl: 610.29, source: "seriousEats"}],
    [2,{name: 'ChickPeas / Garbanzo', driedG:  454.0, cookedG:  1474.175, cannedG:  2456.96324725, cookedMl:  1656.12, dryMl:  767.221864, source: "seriousEats"}],
    [3,{name: 'Pinto', driedG:  454.0, cookedG:  1048.93236, cannedG:  1748.2240964412001, cookedMl: 1537.82, dryMl:  767.221864, source: "seriousEats"}],
    [4,{name: 'Kidney', driedG:  454.0, cookedG:  1105.6314, cannedG:  1842.722685438, cookedMl:  1537.82, dryMl:  639.3515533333334, source: "seriousEats"}],
    [5,{name: 'Cannellini', driedG:  454.0, cookedG:  1133.98, cannedG:  1889.9704466, cookedMl:  1537.82, dryMl: 706.6517168421052, source: "seriousEats"}],
    [6,{name: 'Black-Eyed Peas', driedG:  454.0, cookedG:  1275.72854, cannedG:  2126.2184857618004, cookedMl:  1537.82, dryMl:  767.2218640000001, source: "seriousEats"}]
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

function isValidInput(input){
    return input !== undefined 
        && input !== null
        && input !== "";
}

function inputIsComplete(input){

    return input !== undefined
        && input !== null
        && isValidInput(input.systemOfUnits)
        && isValidInput(input.pulseType)
        && isValidInput(input.pulseStyle)
        && isValidInput(input.quantity)
        && isValidInput(input.measurementUnit);
}

function convertInput(input){

    // input.systemOfUnits;
    // input.pulseType;
    // input.pulseStyle;
    // input.quantity
    // input.measurementUnit

    return;

}

const ResultTable = (input) => {

    if(!inputIsComplete(input)) {
        return <div></div>;
    }

    const tableOutput = {
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

                </FormControl>

                {ResultTable(this.state)}

            </div>
        );
    }
}

export default BeanConverter;