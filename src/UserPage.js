import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './page.css'
import miata from './images/miata.png'
const UserPage = () => {
  const { username } = useParams(); // Get the username from the URL
  const { user } = useUser();

  if (!user) {
    return <div>Please sign in to view your user page.</div>;
  }

  return (
    // <div>
    //   <h1>User Page</h1>
    //   <p>Your email: {user.primaryEmailAddress.emailAddress}</p>
    //   <p>Viewing page for username: {username}</p> {/* Display the username */}
    //   {/* You can add more user-specific information here */}
    // </div>
    <div class="container">
  <div class="car-info">
    <div class="stats-lander">
    <div class="header">
      <img src="gear.png" alt="Gear Icon" />
      <img src="menu.png" alt="Menu Icon" />
    </div>
    <img src={miata} class="car-img" alt="Purple Mazda Miata" />
    <h1>1999 Mazda Miata</h1>
    <div class="specs">
      <h2>140 hp</h2>
      <h2>119 ft/lbs</h2>
      <h2>RWD</h2>
    </div>
    </div>
    <div class="hashtags">
      <p>#Stance #JDM #LowBoys #NA #DropTop</p>
    </div>
    <div class="buttons">
      <button class="button">Performance</button>
      <button class="button">Cosmetics</button>
    </div>
    <div class="performance-part">
      <img src="air_filter.png" alt="Air Filter Icon" />
      <h3>HPS Performance Cold Air Intake</h3>
    </div>
    <img src="anime_girl.png" class="car-img" alt="Anime Girl on Branch" />
  </div>
</div>

  

  );
};

export default UserPage;
