import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import CB_Text from '../LearnHTML/CodeBuddy Graphics/CB_Text.svg'
import CB_Logo from '../LearnHTML/CodeBuddy Graphics/CB_Logo.svg'

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="nav">

      <Link to="/home">
        <img src={CB_Text} className="nav-title" />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        <Link className="navLink" to="/courses">
          Courses
        </Link>


        <Link className="navLink" to="/about">
          About
        </Link>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
