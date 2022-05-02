import React from 'react';

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

class UsdaApiKey extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            "validKey" : false,
            "keyTextInput" : ""
        }
    }

    updateState = (key,value) => {

        this.setState({[[key]]: value});
    }

    checkKeyValidity = () => {

        fetch('https://api.nal.usda.gov/fdc/v1/food/1104067?format=abridged&nutrients=203&nutrients=204&nutrients=205&api_key=' + this.state.keyTextInput)
        .then(response => {
            if(response.ok) {
                console.log(this.props);
                this.props.callback(this.state.keyTextInput);
                this.updateState('validKey', true);
            }
            else(alert("Invalid Key: " + response.status + " " + response.statusText))
        })
    }
    
    render() {

        return (
            <div>
                <TextField id="standard-basic" label="API Key" variant="standard" onChange={event => this.updateState('keyTextInput', event.target.value)} />
                <Button 
                    variant="contained" 
                    onClick={this.checkKeyValidity}
                    disabled={this.state.validKey}
                    >
                    {this.state.validKey ? "Valid Key" : "Save Key"}
                </Button>
            </div>
        );

    }
}

export default UsdaApiKey;