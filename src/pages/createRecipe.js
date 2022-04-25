import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

import HowTo from "../components/HowToCreateRecipe";

class Create extends React.Component {
    render (){
        return (
            <Layout>
                <div style={{marginLeft: "5%", marginRight:"5%"}}>
                        <SEO title="Create Recipe" />
                        <h1>Under Construction!</h1>
                        <HowTo />
                        <br />

                        <TextField id="standard-basic" label="API Key" variant="standard" />
                        <Button variant="contained">Check Validity</Button>
                </div>
            </Layout>
        );
    }
}

export default Create;