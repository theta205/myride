import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Home from './home';
import UserPage from './UserPage'; // Import your UserPage component
import UserEdit from './UserEdit.js'; // Import your UserPage component
import First from './first';
import NotFound from './NotFound'; // Create a 404 Not Found component
import './App.css';
import { useUser } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react'
import UserRoute  from './UserRoute';
import About from './About';
import Menu from './Menu';
import Login from './login';
import Store from './store';
import Test from './test';
import Setup from './setup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useUser();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/test" element={<Test/>} />
          <Route path="/setup" element={<Setup/>} />
          <Route path="/:username" element={<UserRoute/>} /> {/* Dynamic route */}
          {/* <Route path="/api/profiles/:key" element={<Store />}> </Route> */}
          <Route 
            path="/:username/edit" // Dynamic route for usernames
            element={<UserEdit/>} // Add the route for UserPage
          />
          <Route 
            path="/:username/edit/first" // Dynamic route for usernames
            element={<First/>} // Add the route for UserPage
          />
          {/* You can also add other routes here */}
        </Routes>
      </BrowserRouter> 
      
    </div>
  );
}

export default App;
