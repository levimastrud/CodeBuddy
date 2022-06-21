import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import { useEffect } from 'react';

function BasicElements() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 2) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[1].nodeName === 'HEADER' && parsedExpanded[1].firstElementChild.nodeName === 'H1') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    A header tag looks like this <h1> Header! </h1>.
    Header tags are used to title blocks of text.
    There are six sizes of header tags, which can be used to 
    communicate that some information is more important than other information.
    In code it looks like this: <h1> Header One </h1> <h2> Header Two </h2> <h3> 
    Header Three </h3> <h4> Header Four </h4> <h5> Header Five </h5> <h6> Header Six </h6>
    `;

    let task = `Add a <header> element between the <body> tags containing an <h1> element with your favorite food!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <header>
                <h1> Pizza </h1>
            </header>
        </body>
    </html>
    `;

    let hint = `Does <header> have a closing and opening tag?`


    useEffect(() => {
        dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer });
    }, [dispatch]);

    return (
        <div className='topic'>
            <h1>Basic Elements</h1>
            <Lesson
                defaultAnswer={defaultAnswer}
                viewSolution={viewSolution}
                lesson={lesson}
                hint={hint}
                task={task}
                checkAnswer={checkAnswer}
            />
            <button onClick={() => {
                // Stops user from backwards progression
                history.push('/progression')
            }
            }
            > Back </button>
            <button onClick={() => {
                user.recent_topic_completed > 2 ? '' : axios.post('/api/user/next-topic', { username: user.username, nextTopic: 2 })
                answer === 'Correct' ? console.log('go to next task') : console.log('stay here')
            }}>Next</button>
        </div >
    );
}

export default BasicElements;