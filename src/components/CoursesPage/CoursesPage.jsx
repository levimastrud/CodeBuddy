import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Nav from '../Nav/Nav';

import {
    Link,
} from 'react-router-dom';

function CoursesPage() {
    const user = useSelector((store) => store.user);
    return (
        <>
            <Nav />
            <div className="courses">
                <Link to='/progression'><div className='ready'> <h1>Learn HTML</h1> </div></Link>
                <div className='not-ready'> <h1>Learn CSS</h1> </div>
                <div className='not-ready'> <h1>Learn JavaScript</h1> </div>
            </div>
        </>
    );
}

export default CoursesPage;