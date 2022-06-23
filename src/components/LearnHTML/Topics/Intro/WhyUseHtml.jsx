import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function WhyUseHTML() {
    const user = useSelector((store) => store.user);
    const history = useHistory()
    return (
        <div className="container">
            <h1>Why Use HTML?</h1>
            <h3>HTML is the foundation of most web pages. It helps to display the data in a formatted manner which is easy to read and interact with your product information/data.</h3>
            <h3>Other languages are used to make it more interactive or dynamic.</h3>
            <button onClick={() => {
                // Stops user from backwards progression
                user.recent_topic_completed > 1 ? '' : axios.post('/api/user/next-topic', {username: user.username, nextTopic: 1})
                history.push('/progression')
                }
            }
            >Finish Topic</button>
        </div >
    );
}

export default WhyUseHTML;