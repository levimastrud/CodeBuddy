import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { LinearProgress } from '@mui/material';
import swal from 'sweetalert';
import { Button } from '@mui/material';
import Swirls from '../LearnHTML/CodeBuddy Graphics/Swirls.svg'
import Confetti from '../LearnHTML/CodeBuddy Graphics/Confetti.svg'
import { orange } from '@mui/material/colors';

// Routing stuff

import { Link } from 'react-router-dom';

function Progression() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let progress = user.recent_topic_completed * 10;

  // Capitalizes first letter of name

  let welcomeName = user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1): '';

  // Fetches updated user information on page load
  // Resets answer on load

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'SET_ANSWER', payload: '' });
  }, [dispatch]);
  return (
    <div className='progression'>
      <Nav />
      {progress === 100 ? <img className = 'confetti' src = {Confetti}/> : ''}
      <div>
        <div className='container2'>
          <p><i><span className='username'>{progress === 100 ? `${welcomeName} is an HTML jedi`: `${welcomeName} is an HTML padawan`}</span></i></p>
          <h1>Learn HTML: {progress < 0 ? 0 : progress}% Complete</h1>
          <LinearProgress style={{ width: '80vw' }} variant="determinate" value={progress} />
          <br />
          <Button style={{
            borderRadius: 35,
            borderColor: "#f9a03f",
            color: "#f9a03f"
          }} variant="outlined" onClick={async () => {
            swal({
              title: `Are you sure, ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}?`,
              text: "Once reset, all your progression will be lost",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then(async (willDelete) => {
                if (willDelete) {
                  swal("Back to square one!", {
                    icon: "success",
                  });
                  await axios.post('/api/user/reset', { username: user.username })
                  dispatch({ type: 'CLEAR_TOTAL' });
                  dispatch({ type: 'FETCH_USER' });
                } else {
                  swal("Mission aborted!");
                }
              });

          }}>Reset progression</Button>

        </div>

        {/* Course List here */}

        <div className='topics'>

          {/* Linear progression, locks off not unlocked courses */}

          <Link to='/what-is-html'><div className='ready'> <h1> Intro </h1> </div></Link>

          {progress > 0 ? <Link to='/opening-and-closing'><div className='ready'> <h1>Basic Elements</h1> {user.elements_results ? <p>Quiz Score: {user.elements_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Basic Elements</h1> </div>}

          {progress > 10 ? <Link to='/unordered-and-ordered'><div className='ready'> <h1>Lists </h1>{user.lists_results ? <p>Quiz Score: {user.lists_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Lists</h1> </div>}

          {progress > 20 ? <Link to='/images'><div className='ready'> <h1>Images</h1> {user.images_results ? <p>Quiz Score: {user.images_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Images</h1> </div>}

          {progress > 30 ? <Link to='/link-tag'><div className='ready'> <h1>Links</h1> {user.links_results ? <p>Quiz Score: {user.links_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Links</h1> </div>}

          {progress > 40 ? <Link to='/intro-to-css'><div className='ready'> <h1>Styles</h1> {user.styles_results ? <p>Quiz Score: {user.styles_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Styles</h1> </div>}

          {progress > 50 ? <Link to='/form'><div className='ready'> <h1>Forms</h1> {user.forms_results ? <p>Quiz Score: {user.forms_results}</p> : ''} </div></Link> : <div className='not-ready'> <h1>Forms</h1> </div>}

          {progress > 60 ? <Link to='/buttons'><div className='ready'> <h1>Buttons</h1> {user.buttons_results ? <p>Quiz Score: {user.buttons_results}</p> : ''}</div></Link> : <div className='not-ready'> <h1>Buttons</h1> </div>}

          {progress > 70 ? <Link to='/table'><div className='ready'> <h1>Tables</h1> {user.tables_results ? <p>Quiz Score: {user.tables_results}</p> : ''}</div></Link> : <div className='not-ready'> <h1>Tables</h1> </div>}

          {progress > 80 ? <Link to='/congratulations'><div className='ready'> <h1>Final Test</h1> {user.final_results ? <p>Quiz Score: {user.final_results}</p> : ''}</div></Link> : <div className='not-ready'> <h1>Final Test</h1> </div>}

        </div>
      </div>
    </div>
  );
}

export default Progression;