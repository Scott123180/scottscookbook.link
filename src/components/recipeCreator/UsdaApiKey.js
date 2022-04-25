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

        /*
        1. make rest call
        2. if successful
            set valid key true
            disable inputs
            trigger callback
        if not successful
            display error

        */
        
    }

    render() {

        return (
            <div>
                <TextField id="standard-basic" label="API Key" variant="standard" />
                <Button variant="contained">Check Validity</Button>
            </div>
        );

    }
}

