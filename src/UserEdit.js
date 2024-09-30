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
import Home from './home.js'
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import UpdateDataComponent from './store';
import { useEffect, useState } from 'react';
import useFetchProfileData from './fetchProfileData';


const UserEdit = () => {
  const {username} = useParams();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState({}); // State for profile data
  const [error, setError] = useState(''); // To capture error messages
  const [responseMessage, setResponseMessage] = useState(''); // For update success messages

  // Use user.username as the key for the update
  const key = user?.username || ''; // Fallback to an empty string if user is not available

  // Fetch user profile data when the component mounts and when the user is signed in
  useFetchProfileData(key, isLoaded, isSignedIn, setData, setError, navigate); // Use the custom hook

  if (!isLoaded){
    return <span>Loading...</span>
  }


  // Handle changes in the input fields
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle data update request
  const handleUpdate = async () => {
    if (!key) {
      setResponseMessage('Username is not available.');
      return;
    }

    try {
      const response = await fetch(`/api/setprofiles/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setResponseMessage(`Error: ${errorMessage}`);
      } else {
        setResponseMessage('Data updated successfully!');
      }
    } catch (error) {
      setResponseMessage(`Network error: ${error.message}`);
    }
    window.location.reload();

  };

  if(!data || error){
    const def = {year:"2013",make:"Hyundai",model:"Genesis Coupe",trim:"2.0T Premium",horsepower:"276",torque:"250",transmission:"Auto",tags:"#KDM #LIt"}
    setData(def)
    handleUpdate()
  }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
      return navigate('/');
    }
    
    if (isSignedIn && !(user.username == username)){
      console.log(user.username + " " + username)
        return navigate("/"+ username+ "/edit");
    }

    return (
      <Container className="d-flex justify-content-center vh-100">
        <Row>
          <Col><UpdateDataComponent></UpdateDataComponent></Col>
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
                  <h1 className="car-label">{data.year} {data.make} {data.model}</h1>
                </div>
  
                <div className="stats-oval">
                  <Row xs="auto" className="justify-content-center">
                    <Col><span className="stats-label">{data.horsepower} hp</span></Col>
                    <Col><span className="stats-label">{data.torque} ft/lbs</span></Col>
                    <Col><span className="stats-label">{data.transmission}</span></Col>
                  </Row>
                </div>
  
                <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
                  <Col><input className="hashtag-input"
          type="text"
          name="tags"
          placeholder={data?.tags}
          onChange={handleDataChange}
        /> </Col>
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


export default UserEdit;
