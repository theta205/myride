import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SettingsDropdown from './SettingsDropdown';
import PopupWithStatInput from './statsPopup';
import PopupForMods from './modPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetchProfileData from './fetchProfileData';

const UserCarEdit = () => {
  const { username } = useParams();
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  const [inputData, setData] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const [re, needRe] = useState(false);

  const key = user?.username || '';
  useFetchProfileData(key, isLoaded, isSignedIn, setData, setError, navigate);

  useEffect(() => {
    if (inputData) {
      document.documentElement.style.setProperty('--mainColor', inputData.mainColor);
    }
  }, [inputData]);

  useEffect(() => {
    if (re) {
      handleUpdate();
      needRe(false);
    }
  }, [needRe, re]);

  useEffect(() => {
    if (!inputData || error) {
      const def = {
        year: "Year",
        make: "Make",
        model: "Model",
        power: "0",
        torque: "0",
        drivetrain: "RWD",
        hashtags: "#hashtag",
        lightColor: "bisque",
        mainColor: "lightsalmon",
        darkColor: "darksalmon",
        mods: []
      };
      setData(def);
    }
  }, [inputData, error]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    navigate('/');
    return null;
  }

  if (user.username !== username) {
    navigate(`/${username}/edit`);
    return null;
  }

  const handleUpdate = async () => {
    console.log("handleUpdate");
    if (!inputData) {
      console.error("Input data is null, cannot update.");
      return;
    }

    const key = user.username;
    try {
      console.log("doinghandleUpdate", inputData);
      const response = await fetch(`/api/setprofiles/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        console.log("ErrorhandleUpdate");
        const errorMessage = await response.text();
        setResponseMessage(`Error: ${errorMessage}`);
      } else {
        setResponseMessage('Data updated successfully!');
      }
    } catch (error) {
      setResponseMessage(`Network error: ${error.message}`);
    }
  };

  const handleDataSubmit = (submittedData) => {
    console.log("1")
    setData((prevData) => ({
      ...prevData,
      ...submittedData
    }));
    needRe(true);
  };

  const handleDataSubmitTwo = (submittedData) => {
    console.log("2");
    setData((prevData) => {
      const mergedMods = [...(prevData?.mods || []), ...(submittedData?.mods || [])];
      return {
        ...prevData,
        mods: mergedMods,
      };
    });
    needRe(true);
  };

  // New function to handle deletion of mods
  const handleDeleteMod = (modToDelete) => {
    setData((prevData) => {
      const updatedMods = prevData.mods.filter(mod => mod.mod !== modToDelete.mod);
      return {
        ...prevData,
        mods: updatedMods
      };
    });
    needRe(true); // Call handleUpdate after deletion
  };

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const { year, make, model, power, torque, drivetrain, hashtags, lightColor, mainColor, darkColor, mods = [] } = inputData || {};

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Row>
        <Col>
          <div className="bg" style={{ height: "1000px", background: lightColor }}>
            <div className="stats-lander" style={{ position: 'relative', background: mainColor }}>
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
              <div className="settings-overlay">
                <SettingsDropdown className="settings-drop" />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h1 className="car-label">{year} {make} {model}</h1>
              </div>

              <div className="stats-oval" style={{ position: 'relative', background: darkColor }}>
                <Row xs="auto" className="justify-content-center">
                  <Col>
                    <span className="stats-label">{power} hp</span>
                  </Col>
                  <Col>
                    <span className="stats-label">{torque} ft/lbs</span>
                  </Col>
                  <Col>
                    <span className="stats-label">{drivetrain}</span>
                  </Col>
                </Row>
              </div>

              <Row xs={1} className="centered-div justify-content-center" style={{ margin: '0 30px' }}>
                <Col>
                  <span className="hashtag-label">{hashtags}</span>
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
                      display: 'flex'
                    }}
                  ></button>
                }
                modal
                onSub={handleDataSubmit}
              />
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
                {isToggled && mods.map((row) => (
                  row.type && (
                    <CSSTransition
                      key={row.mod}
                      timeout={500}
                      classNames="mod-fade"
                    >
                      <Row className='mod'>
                        <div className='mod-head' style={{ marginTop: '-5px' }}>
                          {row.mod}
                          <button 
                            onClick={() => handleDeleteMod(row)} // Add delete functionality
                            style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
                          >
                            &#x2716; {/* X icon for delete */}
                          </button>
                        </div>
                        <span className='mod-descrip'> {row.details}</span>
                      </Row>
                    </CSSTransition>
                  )
                ))}
                {!isToggled && mods.map((row) => (
                  !row.type && (
                    <CSSTransition
                      key={row.mod}
                      timeout={500}
                      classNames="mod-fade"
                    >
                      <Row className='mod'>
                        <div className='mod-head' style={{ marginTop: '-5px' }}>
                          {row.mod}
                          <button 
                            onClick={() => handleDeleteMod(row)} // Add delete functionality
                            style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
                          >
                            &#x2716; {/* X icon for delete */}
                          </button>
                        </div>
                        <span className='mod-descrip'> {row.details}</span>
                      </Row>
                    </CSSTransition>
                  )
                ))}
              </TransitionGroup>
              <Row style={{ width: '348px', justifyContent: 'center' }}>
                <PopupForMods
                  trigger={
                    <button
                      className='plus-mod'
                      type="button"
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <h1 style={{ paddingTop: '8px' }}>&#x2795;</h1>
                    </button>
                  }
                  modals
                  modtype={isToggled}
                  onSub={handleDataSubmitTwo}
                />
              </Row>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCarEdit;
