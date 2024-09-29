import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css'

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';


const  UserPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) {
      return <div>Loading...</div>;
  }
  return ( 
<Container className="d-flex justify-content-center vh-100">
        <Row>
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
                <div className="settings-overlay" >
                  <SettingsDropdown className="settings-drop" />
                </div>
  
                <div style={{ textAlign: 'center' }}>
                  <h1 className="car-label">1999 Mazda Miata</h1>
                </div>
  
                <div className="stats-oval">
                  <Row xs="auto" className="justify-content-center">
                    <Col><span className="stats-label">140 hp</span></Col>
                    <Col><span className="stats-label">119 ft/lbs</span></Col>
                    <Col><span className="stats-label">RWD</span></Col>
                  </Row>
                </div>
  
                <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
                  <Col><span className="hashtag-label">#Stance #JDM #LowBoys #NA #DropTop</span></Col>
                </Row>
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
            </div>
          </Col>
        </Row>
      </Container>
  );
      
};

export default UserPage;
