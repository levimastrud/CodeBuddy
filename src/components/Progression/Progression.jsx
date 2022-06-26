import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

function Progression() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let progress = user.recent_topic_completed * 10;

  console.log('progress:', progress)

  // Fetches updated user information on page load

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);
  return (
    <>
    <Nav/>
    <div className="container">
      <h1>Learn HTML: {progress < 0 ? 0: progress}% Complete</h1>
      <progress max={100} value = {progress}></progress>
      <br/>
      <button onClick={ async () => {
        await axios.post('/api/user/reset', { username: user.username })
        dispatch({ type: 'CLEAR_TOTAL' });
        dispatch({ type: 'FETCH_USER' })
        }}>Reset progression</button>

      {/* Course List here */}

      <Link to='/what-is-html'><h1> Intro </h1></Link>

      {progress > 0 ? <Link to='/opening-and-closing'><h1 className='ready'> Basic Elements </h1></Link> : <h1 className='not-ready'> Basic Elements </h1>}
      { user.elements_results ? <p>Quiz Score: {user.elements_results}</p> : ''}

      {progress > 10 ? <Link to='/unordered-and-ordered'><h1 className='ready'> Lists </h1></Link> : <h1 className='not-ready'> Lists </h1>}
      { user.lists_results ? <p>Quiz Score: {user.lists_results}</p> : ''}

      {progress > 20 ? <Link to='/images'><h1 className='ready'> Images </h1></Link> : <h1 className='not-ready'> Images </h1>}
      { user.images_results ? <p>Quiz Score: {user.images_results}</p> : ''}

      {progress > 30 ? <Link to='/link-tag'><h1 className='ready'> Links </h1></Link> : <h1 className='not-ready'> Links </h1>}
      { user.links_results ? <p>Quiz Score: {user.links_results}</p> : ''}

      {progress > 40 ? <Link to='/intro-to-css'><h1 className='ready'> Styles </h1></Link> : <h1 className='not-ready'> Styles </h1>}
      { user.styles_results ? <p>Quiz Score: {user.styles_results}</p> : ''}

      {progress > 50 ? <Link to='/form'><h1 className='ready'> Forms </h1></Link> : <h1 className='not-ready'> Forms </h1>}
      { user.forms_results ? <p>Quiz Score: {user.forms_results}</p> : ''}

      {progress > 60 ? <Link to='/buttons'><h1 className='ready'> Buttons </h1></Link> : <h1 className='not-ready'> Buttons </h1>}
      { user.buttons_results ? <p>Quiz Score: {user.buttons_results}</p> : ''}

      {progress > 70 ? <Link to='/table'><h1 className='ready'> Tables </h1></Link> : <h1 className='not-ready'> Tables </h1>}
      { user.tables_results ? <p>Quiz Score: {user.tables_results}</p> : ''}

      {progress > 80 ? <Link to='/congratulations'><h1 className='ready'> Final Test </h1></Link> : <h1 className='not-ready'> Final Test </h1>}
      { user.final_results ? <p>Quiz Score: {user.final_results}</p> : ''}
    </div>
    </>
  );
}

export default Progression;