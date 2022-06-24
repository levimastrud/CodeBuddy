import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FinalTest() {
    const user = useSelector((store) => store.user);
    const history = useHistory()
    let q1 = `What is the <h1> tag used for?`
    return (
        <div className="container">
            <h1>Final Test</h1>
            <form>
                <label for="q1"> {q1} </label>
                <select id="q1" required>
                    <option value="0" selected disabled hidden>Select an Option</option>
                    <option value="volvo" onSelect={() => console.log('hello')}>Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <input type = "submit" value='Submit'></input>
            </form>

            <button onClick={() => {
                // Stops user from backwards progression
                user.recent_topic_completed > 10 ? '' : axios.post('/api/user/next-topic', { username: user.username, nextTopic: 10 })
                history.push('/progression')
            }
            }
            >Finish Topic</button>
        </div >
    );
}

export default FinalTest;