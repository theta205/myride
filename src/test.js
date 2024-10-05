import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import './page.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import transitions
import SettingsDropdown from './SettingsDropdown';
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

  const rowsData = [];

  const [inputData, setData] = useState(initialData);
  const [inputMod, setMod] = useState(rowsData);
  const [isToggled, setIsToggled] = useState(false);

  const handleDataSubmit = (submittedData) => {
    setData(submittedData);
    console.log(submittedData);
  };

  const handleDataSubmitTwo = (submittedData) => {
    setMod(submittedData);
    console.log(submittedData);
  };

  useEffect(() => {
    setData(initialData);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--mainColor', inputData.mainColor);
  }, [inputData]);

  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Row>
        <Col></Col>
        <Col>
          <div className="bg" style={{ height: "1000px", background: inputData.lightColor }}>
            <div className="stats-lander" style={{ position: 'relative', background: inputData.mainColor }}>
              {/* Car Image */}
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

              {/* Settings Dropdown */}
              <div className="settings-overlay">
                <SettingsDropdown className="settings-drop" />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h1 className="car-label">{inputData.year} {inputData.make} {inputData.model}</h1>
              </div>

              <div className="stats-oval" style={{ position: 'relative', background: inputData.darkColor }}>
                <Row xs="auto" className="justify-content-center">
                  <Col>
                    <span className="stats-label">{inputData.power} hp</span>
                  </Col>
                  <Col>
                    <span className="stats-label">{inputData.torque} ft/lbs</span>
                  </Col>
                  <Col>
                    <span className="stats-label">{inputData.drivetrain}</span>
                  </Col>
                </Row>
              </div>

              <Row xs={1} className="centered-div justify-content-center" style={{ margin: '0 30px' }}>
                <Col>
                  <span className="hashtag-label">{inputData.hashtags}</span>
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
                  ></button>
                }
                modal
                onSub={handleDataSubmit}
              />
            </div>

            {/* Toggle Switch */}
            <div className="toggle-container" style={{ padding: '20px 0' }}>
              <label className="toggle-button">
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
                {isToggled && inputMod.map((row) => (
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
                {!isToggled && inputMod.map((row) => (
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
              <Row style={{ width: '348px' }}>
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
}

export default Test;
