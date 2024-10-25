import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SettingsDropdown from './SettingsDropdown';
import useFetchProfileData from './fetchProfileData';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const UserPage = () => {
  const [image, setImage] = useState(null);
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { username } = useParams();
  const [error, setError] = useState('');
  const [tryedFetch, setTryedFetch] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [key, setKey] = useState(null);

  
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

  const [inputData, setData] = useState(null);
  useFetchProfileData( key, setKey,isSignedIn, tryedFetch, setTryedFetch, inputData, setData, setError, navigate, username)

  
  console.log("data is ", inputData)
  useEffect(() => {
    if (inputData) {
      document.documentElement.style.setProperty('--mainColor', inputData.mainColor);
    }
  }, [inputData]);

  const getImageDetails = async (public_id) => {
    try {
      const response = await fetch(`/api/photo/${public_id}`);
      if (!response.ok) {
        throw new Error(`Error fetching image details: ${response.statusText}`);
      }
      const data = await response.json();
      setImage(data.url);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (!isLoaded || !inputData) {
    return <div>Loading...</div>;
  }
  if(isLoaded && !image && key){
    getImageDetails(key);
 }
 if (!key){
  setKey(username);
 }


  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };
  const { year, make, model, power, torque, drivetrain, hashtags, lightColor, mainColor, darkColor, mods = [] } = inputData || {};

  return ( 
    <Container className="d-flex justify-content-center vh-100">
      <Row>
        <Col>
        <div className="bg" style={{ height: "1000px", background: lightColor }}>
            <div className="stats-lander" style={{ position: 'relative', background: mainColor }}>
              {image && <Image src={image} className="img-fluid" style={{ width: "auto", height: "auto", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }} />}
              {!image && <div style={{ height: '50px' }}></div>}
              <div className="settings-overlay">
                <SettingsDropdown className="settings-drop" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h1 className="car-label">{year} {make} {model}</h1>
              </div>
              <div className="stats-oval" style={{ position: 'relative', background: darkColor }}>
                <Row xs="auto" className="justify-content-center">
                  <Col><span className="stats-label">{power} hp</span></Col>
                  <Col><span className="stats-label">{torque} ft/lbs</span></Col>
                  <Col><span className="stats-label">{drivetrain}</span></Col>
                </Row>
              </div>
              <Row xs={1} className="centered-div justify-content-center" style={{ marginRight: '30px', marginLeft: '30px' }}>
                <Col><span className="hashtag-label">{hashtags}</span></Col>
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
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <TransitionGroup>
                {isToggled && mods && mods.map((row) => (
                  row.type && (
                    <CSSTransition key={row.mod} timeout={500} classNames="mod-fade">
                      <Row className='mod'>
                        <div className='mod-head' style={{ marginTop: '-5px' }}>{row.mod}</div>
                        <text className='mod-descrip'> {row.details}</text>
                      </Row>
                    </CSSTransition>
                  )
                ))}
                {!isToggled && mods && mods.map((row) => (
                  !row.type && (
                    <CSSTransition key={row.mod} timeout={500} classNames="mod-fade">
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
