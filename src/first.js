import React from "react";
import { useState } from "react";
import UserEdit from './UserEdit.js'; 
import { Alert, Button } from "react-bootstrap";

const First = () => {

    return(
        <div>
        <Alert style={{justifyContent: 'center', textAlign: 'center'}} variant="dark" >This is a blank profile page - Tap edit to change stats and add a photo - Tap plus sign below to add mods - View your site at myride.show/"your username"</Alert>
        <UserEdit/>
        </div>
    )
}

export default First;
