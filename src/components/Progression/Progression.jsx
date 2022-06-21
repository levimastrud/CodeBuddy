import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Intro from '../LearnHTML/Topics/Intro/Intro';

function Progression() {
  const user = useSelector((store) => store.user);
  let progress = user.recent_topic_completed * 10;
  return (
    <div className="container">
      <h1>Learn HTML: {progress}% Complete</h1>
      <progress max={100} value = {progress}></progress>
      <Link to='/intro'><h1> Intro </h1></Link>
      <Link to='/basic-elements'><h1> Basic Elements </h1></Link>
      <h1> Lists </h1>
      <h1> Images </h1>
      <h1> Links </h1>
      <h1> Styles </h1>
      <h1> Forms </h1>
      <h1> Buttons </h1>
      <h1> Tables </h1>
      <h1> Final Test </h1>
    </div>
  );
}

export default Progression;