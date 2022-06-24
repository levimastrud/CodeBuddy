import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function Styling() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;

        // Logs used for programming check answer logic 

        let wtfString = parsedExpanded[1].textContent.replace(/\r?\n/g, '');

        console.log('parse expanded length:', parsedExpanded.length)
        console.log('parse expanded:', parsedExpanded)
        console.log('parsed', parsed.lastChild.lastChild)
        console.log('WTF:', wtfString)
        console.log('Parsed Node Name goes here ->', wtfString.search('h1'))

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 7) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (wtfString.search('h1') > 1 && wtfString.search('color') > 1) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    When styling, you first select what you want to style, then how you want to style it. The format looks like this:
    h1 {
    color: red;
    }
    There are many, many different style attributes. You can find more to play around with here:  https://www.w3schools.com/css/
    For now, we will use the color style, which changes the color of the selected text to be whatever we specify. 
    `;

    let task = `Style all h1 elements to be a color of your choice!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <style>
                <! -- YOUR CODE HERE -->
            </style>
            <h1> Color me! </h1>
            <h1> Color me too! </h1>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <style>
                h1 {
                    color: blue;
                }
            </style>
            <h1> Color me! </h1>
            <h1> Color me too! </h1>
        </body>
    </html>
    `;

    let hint = `Did you set 'color' to a color?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/classes')
            dispatch({ type: 'SET_ANSWER', payload: '' });
        } else {
            console.log('stay here')
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer });
    }, [dispatch]);

    return (
        <>
            <div className='topic'>
                <h1> Styling </h1>
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
                    isReady();
                }}>Next</button>
            </div >
        </>
    );
}

export default Styling;