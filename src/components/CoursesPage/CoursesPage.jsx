import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Swirls from '../LearnHTML/CodeBuddy Graphics/Swirls.svg'

import {
    Link,
} from 'react-router-dom';

function CoursesPage() {
    const user = useSelector((store) => store.user);
    return (
        <>
            <Nav />
            <div className = 'background'/>
            <div className="courses">
                <Link to='/progression'><div className='ready-course'> <h1>Learn HTML</h1> <p>Learn the standard markup language used by most of the web today.</p></div></Link>
                <div className='not-ready-course'> <h1>Learn CSS</h1> </div>
                <div className='not-ready-course'> <h1>Learn JavaScript</h1> </div>
            </div>
        </>
    );
}

export default CoursesPage;