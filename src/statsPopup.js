import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './page.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PopupWithStatInput = ({ trigger }) => {  // Accept `trigger` as a prop
  const [inputData, setInputData] = useState({
    firstName: '',
    model: '',
    power: '',
    torque: '',
    drivetrain: '',
    hashtag: '',
    year: '2024' // Set default year to 2024
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', inputData);
    // Handle form submission logic here
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= 1900; year--) {
    years.push(year);
  }

  return (
    <div>
      <Popup
        trigger={trigger}  // Use the trigger passed as a prop
        position="bottom center"
        closeOnDocumentClick
      >
        <div className="popup-content">
          <h3>Enter Your Details</h3>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <label htmlFor="year">Year:</label>
                <select
                  name="year"
                  value={inputData.year}
                  onChange={handleInputChange}
                  required
                  style={{ height: 'auto' }}
                >
                  <option value="" disabled>Select a year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </Col>
              <Col>
                <label htmlFor="firstName">Make:</label>
                <input
                  type="text"
                  name="firstName"
                  value={inputData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
                <label htmlFor="model">Model:</label>
                <input
                  type="text"
                  name="model"
                  value={inputData.model}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="power">Power (hp):</label>
                <input
                  type="text"
                  name="power"
                  value={inputData.power}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
                <label htmlFor="torque">Torque (lb/ft):</label>
                <input
                  type="text"
                  name="torque"
                  value={inputData.torque}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col>
                <label htmlFor="drivetrain">Drivetrain:</label>
                <input
                  type="text"
                  name="drivetrain"
                  value={inputData.drivetrain}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="hashtag">Hashtag:</label>
                <input
                  type="text"
                  name="hashtag"
                  value={inputData.hashtag}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default PopupWithStatInput;
