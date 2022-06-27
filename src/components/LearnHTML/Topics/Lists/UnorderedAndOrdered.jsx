import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function UnorderedAndOrdered() {
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
            if (parsedExpanded[1].nodeName === 'UL' || parsedExpanded[1].nodeName === 'OL') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Let’s say you are creating a marshmallow soup recipe. You don’t just want all of your information floating around your page randomly! That’s where lists are great.
    A list is a great way to group related items together.
    An ordered list tag looks like this: <ol> Ordered List! </ol>. An ordered list is… You guessed it! Ordered! It will automatically count and display the list items by number.
    An unordered list tag looks like this: <ul> Ordered List! </ul>. An unordered list is basically just a bulleted list and the order does not matter.
    `;

    let task = `Create a list of your choosing!`;

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
                <ul> List! </ul>
        </body>
    </html>
    `;

    let hint = `Did you use an <ul> or <ol> tag?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/list-item')
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
                <h1>Unordered and Ordered lists</h1>
                <Lesson
                    defaultAnswer={defaultAnswer}
                    viewSolution={viewSolution}
                    lesson={lesson}
                    hint={hint}
                    task={task}
                    checkAnswer={checkAnswer}
                />
                <button className='pageButtons' onClick={() => {
                    // Stops user from backwards progression
                    history.push('/progression')
                }
                }
                > Back </button>
                <button className='pageButtons' onClick={() => {
                    isReady();
                }}>Next</button>
            </div >
        </>
    );
}

export default UnorderedAndOrdered;