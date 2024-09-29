import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import './App.css';
import { useNavigate } from 'react-router-dom';





function Login() {
  // Use the useUser hook to get the details about the logged-in user
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();


  return (
    <div>
        {/* Signed out state */}
        <SignedOut>
          <SignInButton  className = 'custom-login-btn'>
            <input className='inputButton' type="button" value='Log in' style={{paddingTop:'1px', background: 'transparent', color:'black',  border: "1px solid grey" }}/>
          </SignInButton>
        </SignedOut>

        {/* Signed in state */}
        <SignedIn>
          <SignOutButton className = 'custom-login-btn'>
            <input className='inputButton' type="button" value='Log out' style={{paddingTop:'2px', background: 'transparent', color:'black', border: "1px solid grey" }}/>
          </SignOutButton>
        </SignedIn>
        {/* align-items: center;
  text-align: center; */}

      </div>
  );
}

export default Login;
