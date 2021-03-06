import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function OpeningAndClosing() {
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
            if (parsedExpanded[1].nodeName === 'H1') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    An HTML document is composed of tags. Tags consist of an opening and closing tag, typically with content between them. For example, <h1> is a tag that can contain text. The format for this is like so:
    <h1> Text you want to display </h1>
    Forgetting an opening or closing tag can cause unexpected errors and your code to display incorrectly.`;

    let task = `Inside the body tags, create an <h1> tag and write your favorite food in it!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <!-- YOUR CODE HERE -->
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
                <h1> Pizza </h1>
        </body>
    </html>
    `;

    let hint = `Is your code formatted like this: <h1> Text </h1> ?`

    const isReady = () => {
        if (answer === 'Correct') {
            console.log('history.push(/headerandparagraph)')
            history.push('/header-and-paragraph')
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
                <h1>Opening and closing tags</h1>
                <Lesson
                    defaultAnswer={defaultAnswer}
                    viewSolution={viewSolution}
                    lesson={lesson}
                    hint={hint}
                    task={task}
                    checkAnswer={checkAnswer}
                />
                <button className = 'backButton' onClick={() => {
                    // Stops user from backwards progression
                    history.push('/progression')
                }
                }
                > Back </button>
                <button className = 'nextButton' onClick={() => {
                    isReady();
                }}>Next</button>
            </div >
        </>
    );
}

export default OpeningAndClosing;