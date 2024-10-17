import React, { useRef, useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import "./App.css";
import { Row, Col } from 'react-bootstrap';
import Slider from './slider';

const Home = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const [sliderHeight, setSliderHeight] = useState(0);

  const updateSliderHeight = () => {
    if (sliderRef.current) {
      setSliderHeight(sliderRef.current.clientHeight);
    }
  };

  const handleLoadComplete = () => {
    updateSliderHeight(); // Update the height when images are loaded
  };

  useEffect(() => {
    updateSliderHeight(); // Update height on initial load

    window.addEventListener('resize', updateSliderHeight); // Update height on resize

    return () => {
      window.removeEventListener('resize', updateSliderHeight); // Cleanup on unmount
    };
  }, [sliderRef]);

  if (!isLoaded) { 
    return <span>Loading</span>; 
  }  

  const toProfile = () => {
    return navigate("/" + user.username);
  };

  return (
    <div className='App'>
      <Menu />
      <div className='App2' style={{ width: '80%', textAlign: 'center', justifyContent: 'center' }}>
        <span className="header-text">Create a profile to display your stats and mods</span>
      </div>
      <div className='App2'>
        <Row xs={2} className="row-container" style={{ height: 'auto', width: '90%', display: 'flex' }}>
        <Col md={6} sm={6} className="mainContainer">
            <Slider ref={sliderRef} onLoadComplete={handleLoadComplete} />
          </Col>
          <Col md={6} sm={6} className='titleContainer'
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: `${sliderHeight}px`, // Set height dynamically based on Slider height
              minHeight: '200px', // Optional: Set a minimum height for usability
            }}>
            <div className="button-container">
              <span className="share-text">Share Your Ride</span>
              <SignedOut>
                <SignInButton signUpForceRedirectUrl={"setup"}>
                  <input
                    className="inputButton"
                    type="button"
                    value="Get Started"
                    style={{ background: "black" }}
                  />
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <input className={'inputButton'} type="button" value={'Log out'} />
                </SignOutButton>
              </SignedIn>
            </div>
            {user && <div>Your email address is {user.primaryEmailAddress.emailAddress}</div>}
            {isSignedIn && <button onClick={toProfile}>Take me to my profile</button>}      
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
