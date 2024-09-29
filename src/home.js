import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import Menu from './Menu'
import "./App.css"
const Home = (props) => {
  // Use the useUser hook to get the details about the logged in user
  const { user, isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate();

  if (!isLoaded) { return <span>Loading</span>}

  const toProfile = () => {
    return navigate("/"+user.username);
  };
  
  return (
    <div className='App'>
    <Menu></Menu>
    <div className=" mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
      <SignedOut>
        <SignInButton>
          <input className={'inputButton'} type="button" value={'Log in'} />
        </SignInButton>
      </SignedOut>

      {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
      <SignedIn>
        <SignOutButton>
          <input className={'inputButton'} type="button" value={'Log out'} />
        </SignOutButton>
      </SignedIn>

      {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
      {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
      {isSignedIn && <button onClick={toProfile}>Take me to my profile</button>}      
    </div>
    </div>
  )
}

export default Home