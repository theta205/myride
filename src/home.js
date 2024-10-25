import React, { useRef, useEffect, useState } from 'react';
import { SignedIn, SignUp, SignIn, SignedOut, SignOutButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import "./App.css";
import { Row, Col, Button } from 'react-bootstrap';
import Slider from './slider';
import Card from './Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Login from './login';

const Home = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const [sliderHeight, setSliderHeight] = useState(0);
  const [username, setUsername] = useState(''); // State to hold username
  const [usernameS, setSendingUsername] = useState(''); // State to hold sending username

  const [showSignUp, setShowSignUp] = useState(false); // State to control SignUp form visibility
  const [showSignIn, setShowSignIn] = useState(false); // State to control SignIn form visibility
  const [usernameError, setUsernameError] = useState(''); // State to hold username validation error

  const updateSliderHeight = () => {
    if (sliderRef.current) {
      setSliderHeight(sliderRef.current.clientHeight);
    }
  };

  const handleLoadComplete = () => {
    updateSliderHeight(); // Update the height when images are loaded
  };

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9-_]{4,}$/; // Regex to allow alphanumeric, '-', '_', minimum 4 characters
    if (value.trim() === '') {
      setUsernameError('Username cannot be empty.');
    } else if (!regex.test(value)) {
      setUsernameError('Username must be at least 4 characters, and can only contain letters, numbers, (-), or (_).');
    } else {
      setUsernameError('');
      setSendingUsername(value.toLowerCase());
    }
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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleSignUpSuccess = () => {
    // Navigate to profile or another route after successful sign-up
    navigate("/" + user.username + "/edit/first");
  };

  const handleSignInSuccess = () => {
    // Navigate to profile or another route after successful sign-in
    navigate("/" + user.username);
  };

  return (
    <div className='App'>
      <Menu />
      <div className='App2' style={{ width: '80%', textAlign: 'center', justifyContent: 'center' }}>
        <span className="header-text">Create a profile to display your stats and mods</span>
      </div>
      <div className='App2'>
        <Row xs={1} className="row-container" style={{ height: 'auto', width: '90%', display: 'flex' , paddingBottom: '50px'}}>
          <Col md={6} sm={6} xs={12} className="mainContainer">
            <Slider ref={sliderRef} onLoadComplete={handleLoadComplete} />
          </Col>
          <Col md={6} sm={6} xs={12} className='titleContainer'
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: `${sliderHeight}px`, // Set height dynamically based on Slider height
              minHeight: '200px', // Optional: Set a minimum height for usability
            }}>
            <div className="button-container">
              <span className="share-text">Share Your Ride</span>
              <span className="reserve-text">Reserve Your Link</span>

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">myride.show/</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder='your_username'
                  value={username}
                  onChange={handleUsernameChange} // Updated onChange handler
                  isInvalid={!!usernameError} // Show error styling if there is an error
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '9px' }}>
                  {usernameError}
                </Form.Control.Feedback>
              </InputGroup> 

              <SignedOut>
                {!showSignUp && !showSignIn && (
                  <>
                    <input
                      className="inputButton"
                      type="button"
                      value="Get Started"
                      style={{ background: "black", color: "white" }}
                      onClick={() => setShowSignUp(true)} // Show the SignUp component when clicked
                    />
                    <span className="al-text">
                      Already have an account? 
                      <Login/>
                     </span>
                  </>
                )}

                {showSignUp && (
                  <div className="signup-overlay">
                    <div className="signup-container">
                      <SignUp
                        initialValues={{ username: usernameS }} // Pass the username as the initial value
                        onSignUpSuccess={handleSignUpSuccess} // Handle success to navigate
                      />
                      <Button style={{ width: '100%' }} onClick={() => setShowSignUp(false)}>Cancel</Button>
                    </div>
                  </div>
                )}

                {showSignIn && (
                  <div className="signup-overlay">
                    <div className="signup-container">
                      <SignIn
                        onSignInSuccess={handleSignInSuccess} // Handle success to navigate
                      />
                      <Button style={{ width: '100%' }} onClick={() => setShowSignIn(false)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <input className={'inputButton'} type="button" value={'Log out'} />
                </SignOutButton>
              </SignedIn>
            </div>
          </Col>
        </Row>
      </div>
      <div className='App2'>
        {false && <Row style={{ marginTop: '50px', marginBottom: '50px', width: '90%', height: 'auto' }}>
          <Col xs={12} style={{paddingBottom:'20px'}}>
            <Card title={"Hello"} text={"hello"}></Card>
          </Col>
          <Col xs={12 } style={{paddingBottom:'20px'}}>
            <Card title={"Hello"} text={"hello"}></Card>
          </Col>
          <Col xs={12} style={{paddingBottom:'20px'}}>
            <Card title={"Hello"} text={"hello"}></Card>
          </Col> 
        </Row>}
      </div>
    </div>
  );
}

export default Home;
