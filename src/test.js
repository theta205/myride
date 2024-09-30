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
import UpdateDataComponent from './store';
import useFetchProfileData from './fetchProfileData';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupWithStatInput from './statsPopup';
function Test() {
    const {  isLoaded  } = useUser();
 
  // Use useEffect to set default data on mount

  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Handle case where user is not signed in

    const data = {
      year: "2013",
      make: "Hyundai",
      model: "Genesis Coupe",
      trim: "2.0T Premium",
      horsepower: "276",
      torque: "250",
      transmission: "Auto",
      tags: "#KDM #Lit"
    };


  return (
    <Container className="d-flex justify-content-center vh-100">
  <Row>
    <Col></Col>
    <Col>
      <div className="bg">
        <div className="stats-lander" style={{ width: 'auto', position: 'relative' }}>
          
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
            <h1 className="car-label">{data.year} {data.make} {data.model}</h1>
          </div>

          <div className="stats-oval" style={{ position: 'relative' }}>
            <Row xs="auto" className="justify-content-center">
              <Col>
                <input className="stats-label the-input" 
                type="text"
                name="horsepower"
                style={{ width: '45px' }}
                placeholder={data.horsepower}></input>
                <span className="stats-label" style={{ opacity: '50%' }}>hp</span>
              </Col>
              <Col><span className="stats-label">{data.torque} ft/lbs</span></Col>
              <Col><span className="stats-label">{data.transmission}</span></Col>
            </Row>

          </div>

          <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
            <Col>
              <input
                className="hashtag-label the-input"
                type="text"
                name="tags"
                placeholder={data.tags}
              />
            </Col>
          </Row>
          <PopupWithStatInput
                  trigger={
                    <button className="bubble-overlay" 
                      style={{
                        position: 'absolute',
                        top: '0',        // Position at the top
                        left: '0',       // Align left
                        right: '0',      // Align right
                        bottom: '0',     // Align bottom
                        margin: 'auto',
                        width: '100%',   // Full width
                        height: '100%',  // Full height
                        background: 'transparent',  // Transparent background
                        border: '2px solid rgba(255, 255, 255, 0.5)', // Border style
                        cursor: 'pointer', // Change cursor on hover
                        zIndex: 1, // Ensure it's above other elements
                      }}
                    />
                  }
                />
              {/* Optionally, add content inside the bubble here */}
        </div>
        <div className="toggle-container" style={{ paddingTop: '20px' }}>
          <label className="toggle-button">
            <input type="checkbox" />
            <span className="slider">
              <span className="toggle-label off">Cosmetics</span>
              <span className="toggle-label on">Performance</span>
            </span>
          </label>
        </div>
        <PopupWithStatInput></PopupWithStatInput>
      </div>
    </Col>
  </Row>
</Container>

  );
};

export default Test;
