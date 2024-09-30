import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import useFetchProfileData from './fetchProfileData';

const UpdateDataComponent = () => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser(); // Get user information from Clerk
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
  return (
    <div>
      <h2>Update Data</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <input
          type="text"
          name="year"
          placeholder={data?.year || "Year"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="make"
          placeholder={data?.make || "Make"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="model"
          placeholder={data?.model || "Model"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="trim"
          placeholder={data?.trim || "Trim"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="horsepower"
          placeholder={data?.horsepower || "Horsepower"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="torque"
          placeholder={data?.torque || "Torque"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="transmission"
          placeholder={data?.transmission || "Transmission"}
          onChange={handleDataChange}
        />
        <input
          type="text"
          name="tags"
          placeholder={data?.tags || "Tags"}
          onChange={handleDataChange}
        />
      </div>
      <button onClick={handleUpdate}>Update Data</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateDataComponent;
