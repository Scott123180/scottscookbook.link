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
    [1,{name: 'Black', cookedG: 1048.93, cannedG: 1748.22, dryG: 454.0, cookedMl: 1656.12, dryMl: 610.29, source: "seriousEats"}],
    [2,{name: 'ChickPeas / Garbanzo', dryG:  454.0, cookedG:  1474.175, cannedG:  2456.96324725, cookedMl:  1656.12, dryMl:  767.221864, source: "seriousEats"}],
    [3,{name: 'Pinto', dryG:  454.0, cookedG:  1048.93236, cannedG:  1748.2240964412001, cookedMl: 1537.82, dryMl:  767.221864, source: "seriousEats"}],
    [4,{name: 'Kidney', dryG:  454.0, cookedG:  1105.6314, cannedG:  1842.722685438, cookedMl:  1537.82, dryMl:  639.3515533333334, source: "seriousEats"}],
    [5,{name: 'Cannellini', dryG:  454.0, cookedG:  1133.98, cannedG:  1889.9704466, cookedMl:  1537.82, dryMl: 706.6517168421052, source: "seriousEats"}],
    [6,{name: 'Black-Eyed Peas', dryG:  454.0, cookedG:  1275.72854, cannedG:  2126.2184857618004, cookedMl:  1537.82, dryMl:  767.2218640000001, source: "seriousEats"}]
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


const metricOptions = (pulseStyle) => {

    const volumeOptionMl = pulseStyle !== "canned" ? <FormControlLabel value="ml" control={<Radio />} label="ml" /> : "";

    return (
        <div>
            <FormControlLabel value="grams" control={<Radio />} label="grams" />
            {volumeOptionMl}
        </div>
    );

}
const imperialOptions = (pulseStyle) => {

    const volumeOptionCup = pulseStyle !== "canned" ? <FormControlLabel value="cups" control={<Radio />} label="Cups" /> : "";
    const volumeOptionFl = pulseStyle !== "canned" ? <FormControlLabel value="fluidOunce" control={<Radio />} label="Fluid Ounce" /> : "";

    return (
        <div>
            <FormControlLabel value="ounce" control={<Radio />} label="Ounce" />
            {volumeOptionCup}
            {volumeOptionFl}
        </div>
    );

}

//generate the options based off of the bean style
const MeasurementUnit = (callBackUpdate, measurementUnit, systemOfUnits, pulseStyle) => {

    const formOptions = systemOfUnits === imperial ? imperialOptions(pulseStyle) : metricOptions(pulseStyle);

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

function fromCups(cups){return cups * 236.588;}
function toCups(ml){return ml / 236.588;}
function fromFlOz(floz){return fromCups(floz) / 8;}
function toFlOz(ml){return toCups(ml) * 8;}
function fromOz(oz){return oz * 28.3495;}
function toOz(g){return g / 28.3495;}

function convertInput(input){

    const pulseType = input.pulseType;
    const mapEntry = beanMap.get(pulseType);

    const qty = input.quantity;
    const pulseStyle = input.pulseStyle;
    const measurementUnit = input.measurementUnit;

    //convert to dried g
    const driedWeight = convertToDriedBeansG(mapEntry, qty, pulseStyle, measurementUnit);

    //convert to other units
    return convertDriedBeansToAll(mapEntry, driedWeight);
}

function convertDriedBeansToAll(mapEntry, qty){

    //cooked
    const cookedG = (mapEntry.cookedG/mapEntry.dryG) * qty;
    const cookedMl = (mapEntry.cookedMl/mapEntry.dryG) * qty;
    const cookedCups = toCups(cookedMl);
    const cookedOz = toOz(cookedG);
    const cookedFlOz = toFlOz(cookedMl);

    //dried
    const driedG = qty;
    const driedMl = (mapEntry.dryMl/mapEntry.dryG) * qty; 
    const driedCups = toCups(driedMl);
    const driedOz = toOz(driedG);
    const driedFlOz = toFlOz(driedG);

    //canned
    const cannedG = (mapEntry.cannedG/mapEntry.dryG) * qty; 
    const cannedOz = toOz(cannedG);

    return {
        "cooked (g)": Math.round(cookedG),
        "cooked (ml)": Math.round(cookedMl),
        "cooked (cups)": cookedCups.toFixed(3),
        "cooked (oz)": cookedOz.toFixed(3),
        "cooked (fl)": cookedFlOz.toFixed(3),
        "dried (g)": Math.round(driedG),
        "dried (ml)": Math.round(driedMl),
        "dried (cups)": driedCups.toFixed(3),
        "dried (oz)": driedOz.toFixed(3),
        "dried (fl)": driedFlOz.toFixed(3),
        "canned (g)": Math.round(cannedG),
        "canned (oz)": cannedOz.toFixed(3),
    }

}

function convertToDriedBeansG(mapEntry, qty, style, measurementUnit){
    let fluidRatio;
    let weightRatio;

    if(style === "dried"){
        fluidRatio = mapEntry.dryG / mapEntry.dryMl;
        weightRatio = 1;

    } else if (style === "cooked"){
        fluidRatio = mapEntry.dryG / mapEntry.cookedMl;
        weightRatio = mapEntry.dryG / mapEntry.cookedG;

    } else { //canned
        fluidRatio = null;
        weightRatio = mapEntry.dryG / mapEntry.cannedG;
    }

    if(measurementUnit === "cups"){
        const qtyMl = fromCups(qty);
        return qtyMl * fluidRatio;
    } else if (measurementUnit === "ounce"){
        const qtyG = fromOz(qty);
        return qtyG * weightRatio;
    } else if (measurementUnit === "fluidOunce"){
        const qtyMl = fromFlOz(qty);
        return qtyMl * fluidRatio;
    } else if (measurementUnit === "ml"){
        return qty * fluidRatio;
    } else { //grams
        return weightRatio * qty;
    }
}


const ResultTable = (input) => {

    if(!inputIsComplete(input)) {
        return <div></div>;
    }
    
    const output = convertInput(input);

    return (

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
                {
                    Object.keys(output).map((key, objectIndex) => {

                        return (
                            <TableRow key={objectIndex}>
                                <TableCell variant="head">{key}</TableCell>
                                <TableCell variant="head">{output[key]}</TableCell>
                            </TableRow>
                        )
                    })
                }
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

    updateStyleState = (value) => {
        if(value === "canned"){
            this.setState({
                "measurementUnit":  "",
                "pulseStyle": value
            })
        } else {
            this.updateState("pulseStyle", value);
        }

    }

    render() {

        return (
            <div>
                <p></p>
                <h1>Bean Converter</h1>

                <FormControl>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Imperial</Typography>
                            <Switch onChange={(event, value) => this.updateMetricState(value)} />
                        <Typography>Metric</Typography>
                    </Stack>

                    <p>Recipe Calls for</p>

                    {BeanSelector((type) => this.updateState("pulseType", type))}
                    {BeanStyle((style) => this.updateStyleState(style))}
                    {BeanQuantity((quantity) => this.updateState("quantity", quantity))}
                    {MeasurementUnit((unit) => this.updateState("measurementUnit", unit),this.state.measurementUnit,this.state.systemOfUnits,this.state.pulseStyle)}

                </FormControl>

                {ResultTable(this.state)}

            </div>
        );
    }
}

export default BeanConverter;