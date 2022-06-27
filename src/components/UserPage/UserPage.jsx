import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CB_Logo from '../LearnHTML/CodeBuddy Graphics/CB_Logo.svg'
import { Button } from '@mui/material';
import HalfTone from '../LearnHTML/CodeBuddy Graphics/HalfToneGradient.svg'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  return (
    <div className="homepage">
      <img src={CB_Logo} className='code-buddy-xtra-large'></img>
      <h2>Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h2>
      <Button style={{
        borderRadius: 35,
        backgroundColor: "#76a3db"
      }} variant="contained" onClick={() => history.push('/courses')}>Jump right in!</Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
