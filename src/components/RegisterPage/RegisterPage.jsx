import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from '@mui/material';
import CB_Logo from '../LearnHTML/CodeBuddy Graphics/CB_Logo.svg'


function RegisterPage() {
  const history = useHistory();

  return (
    <>
      <div className='flexwrapper'>
      <img className = 'logo' src = {CB_Logo}/>
        <RegisterForm />

        <center>
          <Button
            type="button"
            style={{
              borderRadius: 35,
              color: "#76a3db",
              marginTop: '2em'
            }} variant='outlined'
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    </>
  );
}

export default RegisterPage;
