import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import UserPage from './UserPage'; // Import your UserPage component
import './App.css';
import { useUser } from '@clerk/clerk-react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useUser();
  console.log(user);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} 
          />
          <Route 
            path="/:username" // Dynamic route for usernames
            element={<UserPage />} // Add the route for UserPage
          />
          {/* You can also add other routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
