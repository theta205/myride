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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const  UserPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const { user, isLoaded, isSignedIn } = useUser();
  let owner = false;
  console.log(username);
  const navigate = useNavigate();

  const [isButtonVisible, setButtonVisible] = useState(false); // State for button visibility
  console.log('Is Loaded:', isLoaded);
  console.log('Is Signed In:', isSignedIn);
  console.log('Username:', username);
  console.log('User:', user);

  if (isSignedIn){
    if (user.username==username) {
      owner = true;
    }
  }


  useEffect(() => {
      // Show the button based on the owner's status after the component mounts
      setButtonVisible(owner); // Update button visibility
  }, [owner]); // Dependency array

  const editClick = () => {
    // Perform an action (e.g., set a message)
    return navigate("/"+user.username+"/edit");
  };


  if (!isLoaded) {
      return <div>Loading...</div>;
  }
  return ( 
 <Container className="d-flex justify-content-center vh-100">
  <Row>
    <Col> 
     <div className='bg '>
        <div className="stats-lander " style = {{width:'auto'}}>
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
            <h1 className = "vis car-label">1999 Mazda Miata</h1>
          </div>
          <div className="stats-oval text-center">
            <Row xs='auto' className="justify-content-center ">
              <Col> <span className="stats-label" >140 hp</span></Col>
              <Col> <span className="stats-label" >119 ft/lbs</span></Col>
              <Col> <span className="stats-label" >RWD</span></Col>
            </Row>
          </div>
            <Row xs='auto' className="centered-div justify-content-center "> 
           
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
        {isButtonVisible && <button id="conditional-button" onClick={editClick}>Edit Car Details</button>}      
        </div> 
    </Col>
  </Row>         
</Container>

//         {/* <div class="hashtags">
//           <p>#Stance #JDM #LowBoys #NA #DropTop</p>
//         </div>
//         <div class="performance-part">
//           <img src="air_filter.png" alt="Air Filter Icon" />
//           <h3>HPS Performance Cold Air Intake</h3>
//         </div>
//         <img src="anime_girl.png" class="car-img" alt=" on Branch" /> */}
// {/* 

// </Container>
//    */}
      
  );
      
};

export default UserPage;
