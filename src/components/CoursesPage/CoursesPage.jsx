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
            <div className="container">
                <Link to='/progression'><h1 className='ready'> Learn HTML </h1></Link>
                <h1 className='not-ready'> Learn CSS </h1>
                <h1 className='not-ready'> Learn JavaScript </h1>
            </div>
        </>
    );
}

export default CoursesPage;