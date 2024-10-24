import React from "react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Setup = () => {
    const navigate = useNavigate();
    const { user, isLoaded, isSignedIn } = useUser();
    if (user){
        navigate("/"+user.username)
    }
}; 
export default Setup;