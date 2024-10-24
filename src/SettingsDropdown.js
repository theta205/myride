import React from "react";
import './page.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from "react-bootstrap/esm/Image";
import { useUser } from "@clerk/clerk-react";
import { useParams, useLocation } from 'react-router-dom';



function SettingsDropdown() {
    const location = useLocation();
    const isEditPage = location.pathname.endsWith('/edit');
    const {username} = useParams();
  const { user, isLoaded, isSignedIn } = useUser();
let owner;
if (isSignedIn && user.username == username){
    owner = true
}
    return (
            <Dropdown>
              <Dropdown.Toggle variant="light" 
                    id="dropdown-circle-toggle" 
                    style={{
                    width: '50px',         // Adjust the width
                    height: '50px',        // Adjust the height
                    padding: 0,            // Remove any padding
                    borderRadius: '40%',   // Makes the toggle a circle
                    overflow: 'hidden',    // Ensures content fits within the circle
                    }}>
                    <img
                    src="/images/settingsIcon.png"
                    alt="settings-dropdown"
                    objectFit="cover"
                    style={{ width: '30px', height: '30px' }}
                    />

              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!isSignedIn &&<Dropdown.Item href="/">SignUp/LogIn</Dropdown.Item>}
                {isSignedIn &&<Dropdown.Item href="/">Home</Dropdown.Item>}
                {isSignedIn && !owner && <Dropdown.Item href={"/" + user.username }>My Profile</Dropdown.Item> }
               {isSignedIn && owner && !isEditPage && <Dropdown.Item href={"/" + user.username + "/edit"}>Edit</Dropdown.Item>}
               {isSignedIn && owner && isEditPage && <Dropdown.Item href={"/" + user.username}>MyProfile</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
    )
}
export default SettingsDropdown;