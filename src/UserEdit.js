import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css'
import miata from './images/miata.png'

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.js'
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { username } = useParams(); // Get the username from the URL
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
      return navigate('/');
    }
    else console.log(user);

    if (isSignedIn){
      if (user.username!=username) {
        return navigate("/"+user.username+"/edit");
      }
    }
    

  return (
<Container className="d-flex justify-content-center vh-100">
  <Row>
    <Col>
      <div className='bg '> 
        <div className="stats-lander " style = {{width:'600px'}}>
          <Image 
            src={miata}
            className="img-fluid"
            style={{
              width: "auto", 
              height: "auto",
              borderBottomLeftRadius: "0px", 
              borderBottomRightRadius: "0px"
            }} 
          />
          <div style={{ textAlign: 'center' }}>
            <h1 className = "car-label">1999 Mazda Miata</h1>
          </div>
          <div className="stats-oval text-center">
            <Row className="justify-content-center ">
              <Col> <span className="stats-label" >140 hp</span></Col>
              <Col> <span className="stats-label" >119 ft/lbs</span></Col>
              <Col> <span className="stats-label" >RWD</span></Col>
            </Row>
          </div>
            <Row xs='auto' className="centered-div justify-content-center "> 
            {/* max 5 i gues */}
              <Col> <span className="hashtag-label" >#Stance</span></Col>
              <Col> <span className="hashtag-label" >#JDM</span></Col>
              <Col> <span className="hashtag-label" >#LowBoys</span></Col>
              <Col> <span className="hashtag-label" >#NA</span></Col>
              <Col> <span className="hashtag-label" >#DropTop</span></Col>
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
        {/* <div class="hashtags">
          <p>#Stance #JDM #LowBoys #NA #DropTop</p>
        </div>
        <div class="performance-part">
          <img src="air_filter.png" alt="Air Filter Icon" />
          <h3>HPS Performance Cold Air Intake</h3>
        </div>
        <img src="anime_girl.png" class="car-img" alt=" on Branch" /> */}
</Container>
  

  );
};

export default UserEdit;
