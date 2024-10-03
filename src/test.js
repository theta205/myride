import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import UpdateDataComponent from './store'; // Unused? If not needed, remove
import useFetchProfileData from './fetchProfileData'; // Unused? If not needed, remove
import Popup from 'reactjs-popup';
import PopupWithStatInput from './statsPopup';
import PopupForMods from './modPopup';

function Test() {
  const { isLoaded } = useUser();
  
  const initialData = {
    year: "2013",
    make: "Hyundai",
    model: "Genesis Coupe",
    power: "276",
    torque: "250",
    drivetrain: "RWD",
    hashtags: "#KDM #Lit",
    lightColor: 'mistyrose',
    mainColor: 'lightcoral',
    darkColor: 'indianred'
  };

  const [inputData, setData] = useState(initialData);

  const handleDataSubmit = (submittedData) => {
    setData(submittedData);
    console.log(submittedData);
  };

  useEffect(() => {
    setData(initialData);
  }, []); // Empty dependency array means it runs only once on mount
  useEffect(() => {
    // Set CSS variables based on inputData
    document.documentElement.style.setProperty('--mainColor', inputData.mainColor);

}, [inputData]); // Runs every time inputData changes

// Initialize the state with false (off)
const [isToggled, setIsToggled] = useState(false);

// Function to handle the toggle switch change
const handleToggle = () => {
  setIsToggled(prevState => !prevState);
};
  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const rowsData = [
    { id: 1, content: 'First row content' },
    { id: 2, content: 'Second row content' },
    { id: 3, content: 'Third row content' },
    // You can add as many objects as needed here.
  ];

  // Use useEffect to set initial data on mount

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Row>
        <Col></Col>
        <Col>
          <div className="bg" style={{ height: "1000px" ,background: inputData.lightColor }}>
            <div className="stats-lander" style={{ width: 'auto', position: 'relative', background: inputData.mainColor }}>
              
              {/* Image of the Miata */}
              <Image
                src="/images/miata.png"
                className="img-fluid"
                style={{
                  width: "auto",
                  height: "auto",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              />
              
              {/* SettingsDropdown overlay */}
              <div className="settings-overlay">
                <SettingsDropdown className="settings-drop" />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h1 className="car-label">{inputData.year} {inputData.make} {inputData.model}</h1>
              </div>

              <div className="stats-oval" style={{ position: 'relative', background: inputData.darkColor }}>
                <Row xs="auto" className="justify-content-center">
                  <Col>
                    <span className="stats-label" > {inputData.power} hp</span>
                  </Col>
                  <Col><span className="stats-label">{inputData.torque} ft/lbs</span></Col>
                  <Col><span className="stats-label">{inputData.drivetrain}</span></Col>
                </Row>
              </div>
              <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
                <Col>
                  <span className="hashtag-label"> {inputData.hashtags} </span>
                </Col>
              </Row>
              <PopupWithStatInput
                trigger={
                  <button
                    className="bubble-overlay" 
                    style={{
                      position: 'absolute',
                      top: '15',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      margin: 'auto',
                      width: '100%',
                      height: '78%',
                      background: 'transparent',
                      border: 'transparent',
                      cursor: 'pointer',
                      zIndex: 1,
                    }}
                  >
                  </button>
                }
                modal
                onSub={handleDataSubmit} // Pass the submit handler correctly
              />
            </div>
            <div className="toggle-container" style={{ paddingTop: '20px',paddingBottom: '20px' }}>
              <label className="toggle-button">
                <input type="checkbox" 
                onChange={handleToggle}
                />
                <span className="slider">
                  <span className="toggle-label off">Cosmetics</span>
                  <span className="toggle-label on">Performance</span>
                </span>
              </label>
            </div>
            <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {rowsData.map((row) => (
                    <Row key={row.id} className='mod'>
                        <div className='mod-head'style={{marginTop:'-5px'}}>{row.content}</div>
                        <text className='mod-descrip'> hkfnsdfks</text>
                    </Row>
                ))}
                <Row style={{width:'348px' }}>
                    <PopupForMods trigger={ 
                        <button 
                            className='plus-mod'
                            type="button"
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            >
                            <h1 style={{paddingTop: '8px'}}>&#x2795;</h1>
                        </button>
                    }
                    modals
                    modtype={isToggled}
                    />
                </Row>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Test;
