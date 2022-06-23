import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function WhatIsHTML() {
    const user = useSelector((store) => store.user);
    const history = useHistory()
    return (
        <div className="container">
            <h1>What is HTML?</h1>
            <h3>HTML or Hyper Text Markup Language allows developers to create and structure information.</h3>
            <h3>Although HTML is not technically a programming language, it is integral to web development and is used in 94.6% of all websites today.</h3>
            <h3>The first version of HTML was created by Tim Berners-Lee in 1993.</h3>
            <button onClick={() => {
                // Stops user from backwards progression
                history.push('/why-use-html')
                }
            }
            >Next</button>
        </div >
    );
}

export default WhatIsHTML;