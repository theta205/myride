import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';  // Import popup styles

const PopupWithStatInput = ({ trigger }) => {  // Accept `trigger` as a prop
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: ''
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
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={inputData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={inputData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default PopupWithStatInput;
