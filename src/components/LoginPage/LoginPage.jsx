import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import CB_Logo from '../LearnHTML/CodeBuddy Graphics/CB_Logo.svg'


function LoginPage() {
  const history = useHistory();

  return (
    <div className='flexwrapper'>
      <img className='logo' src={CB_Logo} />
      <div>
        <LoginForm />

        <center>
          <Button
            type="button"
            style={{
              borderRadius: 35,
              color: "#76a3db",
              marginTop: '2em'
            }} variant='outlined'
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
