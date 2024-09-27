import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
function UserRoute() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useParams();  // Get userParam from the URL
  const navigate = useNavigate();
  console.log(username)
  useEffect(() => {
    // Fetch users from backend
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data); // Save users to state

        // Check if the user exists in the fetched data
        const userExists = data.some(user => user.username === username);
      
        // Navigate if user does not exist
        if (!userExists) {
          return <span></span>; // Redirect to 404 if user does not exist
        }
      })
      .catch(err => {
        setError(err.message);
        navigate('/404'); // Redirect to 404 on error
      });
  }, [username, navigate]);

  // Handle loading state
  if (users.length === 0) {
    return <div>Loading...</div>; // Loading state while fetching
  }

  // Find the specific user object that matches userParam
  const user = users.find(user => user.username === username);

  if (user) {
    // If the user exists, render their information
    return (
      <UserPage></UserPage>
    );
  } else {
    return <div>User not found</div>; // Fallback if user somehow doesn't exist
  }
}

export default UserRoute;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function UserRoute() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const { userParam } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch users from backend
//     fetch('/api/users')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUsers(data);
//         const userExists = data.some(user => user.username === userParam);
        
//         // Navigate based on user existence after fetching users
//         if (!userExists) {
//           navigate('/404'); // Redirect to 404 if user does not exist
//         } else {
//           navigate('/' + userParam); // Redirect to the user page if they exist
//         }
//       })
//       .catch(err => {
//         setError(err.message);
//         navigate('/404'); // Redirect to 404 on error
//       });
//   }, [userParam, navigate]); // Add dependencies to the effect

//   if (error) {
//     return <div>Error: {error}</div>; // Display error message
//   }

//   // Optionally, you can show a loading state while fetching users
//   if (users.length === 0) {
//     return <div>Loading...</div>; // Loading state while fetching
//   }

//   return null; // Return null as navigation has already occurred
// }

// export default UserRoute;
