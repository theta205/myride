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
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from './SettingsDropdown';
import { useEffect, useState } from 'react';
import useFetchProfileData from './fetchProfileData';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 

const  UserPage = () => {
  const [image, setImage] = useState(null)
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { username }= useParams();
  const [error, setError] = useState(''); // To capture error messages
  const [responseMessage, setResponseMessage] = useState(''); // For update success messages
  const [isToggled, setIsToggled] = useState(false);
  const [tryedFetch, setTryedFetch] = useState(false);

  const def = {
    year: "1995",
    make: "Mazda", 
    model: "MX-5 Miata",
    power: "0",
    torque: "0",
    drivetrain: "RWD",
    hashtags: "#hashtag",
    lightColor: "bisque",
    mainColor: "lightsalmon",
    darkColor: "darksalmon",
    mods: []
};

  const [inputData, setData] = useState(def);

  // Use user.username as the key for the update
  
  const key = username
  useFetchProfileData( key, isSignedIn, tryedFetch, setTryedFetch, inputData, setData, setError, navigate)
  
  

  useEffect(() => {
    // Set the main color in the document's style
    if (inputData) {
      document.documentElement.style.setProperty('--mainColor', inputData.mainColor);
    }
  }, [inputData]);


  if (!isLoaded) {
      return <div>Loading...</div>;
  }
  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };
  const getImageDetails = async (public_id) => {
    try {
        const response = await fetch(`/api/photo/${public_id}`);
    
        if (!response.ok) {
          throw new Error(`Error fetching image details: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Fetched image details:', data);
        setImage(data.url) ;
      } catch (error) {
        console.error('Error:', error);
      }
  };
  getImageDetails(username)


return ( 
<Container className="d-flex justify-content-center vh-100">
        <Row>
          <Col>
          <div className="bg" style={{ height: "1000px", background: inputData.lightColor }}>
          <div className="stats-lander" style={{ position: 'relative', background: inputData.mainColor }}>
                
                {/* Image of the Miata */}
               { image && <Image
                  src={image}
                  className="img-fluid"
                  style={{
                    width: "auto",
                    height: "auto",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                />}
                  {!image && <div style={{height:'50px'}}></div>}
                {/* SettingsDropdown overlay */}
                <div className="settings-overlay" >
                  <SettingsDropdown className="settings-drop" />
                </div>
  
                <div style={{ textAlign: 'center' }}>
                  <h1 className="car-label">{inputData.year} {inputData.make} {inputData.model}</h1>
                </div>
  
                <div className="stats-oval" style={{ position: 'relative', background: inputData.darkColor }}>

                  <Row xs="auto" className="justify-content-center">
                    <Col><span className="stats-label">{inputData.power} hp</span></Col>
                    <Col><span className="stats-label">{inputData.torque} ft/lbs</span></Col>
                    <Col><span className="stats-label">{inputData.drivetrain}</span></Col>
                  </Row>
                </div>
  
                <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
                  <Col><span className="hashtag-label">{inputData.hashtags}</span></Col>
                </Row>
              </div>
              <div className="toggle-container" style={{ padding: '20px 0' }}>
                <label className="toggle-button" type='button'>
                  <input type="checkbox" onChange={handleToggle} />
                  <span className="slider">
                    <span className="toggle-label off">Cosmetics</span>
                    <span className="toggle-label on">Performance</span>
                  </span>
                </label>
              </div>
              {/* Mod List */}
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <TransitionGroup>
                {isToggled && inputData.mods&& inputData.mods.map((row) => (
                  row.type && (
                    <CSSTransition
                      key={row.mod}
                      timeout={500}
                      classNames="mod-fade" // CSS class for the animation
                    >
                      <Row className='mod'>
                        <div className='mod-head' style={{ marginTop: '-5px' }}>{row.mod}</div>
                        <text className='mod-descrip'> {row.details}</text>
                      </Row>
                      
                    </CSSTransition>
                  )
                ))}
                {!isToggled &&inputData.mods&& inputData.mods.map((row) => (
                  !row.type && (
                    <CSSTransition
                      key={row.mod}
                      timeout={500}
                      classNames="mod-fade"
                    >
                      <Row className='mod'>
                        <div className='mod-head' style={{ marginTop: '-5px' }}>{row.mod}</div>
                        <text className='mod-descrip'> {row.details}</text>
                      </Row>
                    </CSSTransition>
                  )
                ))}
              </TransitionGroup>
            </Col>
            </div>
          </Col>
        </Row>
      </Container>
  );
      
};

export default UserPage;
