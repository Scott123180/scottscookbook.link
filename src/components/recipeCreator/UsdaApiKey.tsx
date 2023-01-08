import * as React from 'react';

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


interface MyProps {
    callback : any
}

interface MyState {
    validKey : boolean,
    keyTextInput : string
}

class UsdaApiKey extends React.Component<MyProps, MyState> {

    constructor(props : any){
        super(props);

        this.state = {
            validKey : false,
            keyTextInput : ""
        }
    }

    checkKeyValidity = () => {

        fetch('https://api.nal.usda.gov/fdc/v1/food/534358?nutrients=203&nutrients=204&nutrients=205&api_key=' + this.state.keyTextInput)
        .then(response => {
            if(response.ok) {
                this.props.callback(this.state.keyTextInput);
                this.setState({validKey: true});
            }
            else(alert("Invalid Key: " + response.status + " " + response.statusText + " Key=\"" + this.state.keyTextInput + "\""))
        })
    }
    
    render() {

        return (
            <div>
                <TextField id="standard-basic" label="API Key" variant="standard" onChange={(event) => this.setState({keyTextInput: event.target.value})} />
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