import React, { useState } from 'react';

const UpdateDataComponent = () => {
  const [key, setKey] = useState('');
  const [data, setData] = useState({}); // Assume we want to update with an object
  const [responseMessage, setResponseMessage] = useState('');

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
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
  };

  return (
    <div>
      <h2>Update Data</h2>
      <input
        type="text"
        placeholder="Enter key"
        value={key}
        onChange={handleKeyChange}
      />
      <div>
        <input
          type="text"
          name="fieldName1"
          placeholder="Field Name 1"
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="fieldName2"
          placeholder="Field Name 2"
          onChange={handleDataChange}
        />
        {/* Add more fields as needed */}
      </div>
      <button onClick={handleUpdate}>Update Data</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateDataComponent;
