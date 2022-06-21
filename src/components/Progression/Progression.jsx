import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Intro from '../LearnHTML/Topics/Intro/Intro';

function Progression() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let progress = user.recent_topic_completed * 10;

  // Fetches updated user information on page load

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);
  return (
    <div className="container">
      <h1>Learn HTML: {progress < 0 ? 0: progress}% Complete</h1>
      <progress max={100} value = {progress}></progress>
      <Link to='/intro'><h1> Intro </h1></Link>
      {progress > 0 ? <Link to='/basic-elements'><h1 className='ready'> Basic Elements </h1></Link> : <h1 className='not-ready'> Basic Elements </h1>}
      {progress > 10 ? <Link to='/lists'><h1 className='ready'> Lists </h1></Link> : <h1 className='not-ready'> Lists </h1>}
      {progress > 20 ? <Link to='/images'><h1 className='ready'> Images </h1></Link> : <h1 className='not-ready'> Images </h1>}
      {progress > 30 ? <Link to='/links'><h1 className='ready'> Links </h1></Link> : <h1 className='not-ready'> Links </h1>}
      {progress > 40 ? <Link to='/styles'><h1 className='ready'> Styles </h1></Link> : <h1 className='not-ready'> Styles </h1>}
      {progress > 50 ? <Link to='/forms'><h1 className='ready'> Forms </h1></Link> : <h1 className='not-ready'> Forms </h1>}
      {progress > 60 ? <Link to='/buttons'><h1 className='ready'> Buttons </h1></Link> : <h1 className='not-ready'> Buttons </h1>}
      {progress > 70 ? <Link to='/tables'><h1 className='ready'> Tables </h1></Link> : <h1 className='not-ready'> Tables </h1>}
      {progress > 80 ? <Link to='/final-test'><h1 className='ready'> Final Test </h1></Link> : <h1 className='not-ready'> Final Test </h1>}
    </div>
  );
}

export default Progression;