import React from "react";
import { useUser } from "@clerk/clerk-react";

const newUser = async (key) => {
        const data = {year:"2013",make:"Hyundai",model:"Genesis Coupe",trim:"2.0T Premium",horsepower:"276",torque:"250",transmission:"Auto",tags:"#KDM #LIt"}
      
        try {
          const response = await fetch(`/api/setprofiles/${key}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert the object to JSON
          });
      
          if (!response.ok) {
            const errorMessage = await response.text(); // Get the error message from the response
            throw new Error(`Error: ${errorMessage}`);
          }
      
          const responseData = await response.json(); // Parse the response if needed
          console.log('Response from API:', responseData); // Log the response from the API
        } catch (error) {
          console.error('Failed to update profile data:', error.message);
        }
}
export default newUser