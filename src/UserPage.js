import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const UserPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const { user } = useUser();

  if (!user) {
    return <div>Please sign in to view your user page.</div>;
  }

  return (
    <div>
      <h1>User Page</h1>
      <p>Your email: {user.primaryEmailAddress.emailAddress}</p>
      <p>Viewing page for username: {username}</p> {/* Display the username */}
      {/* You can add more user-specific information here */}
    </div>
  );
};

export default UserPage;
