import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function IntroToCSS() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;

        // Logs used for programming check answer logic 

        console.log('parse expanded length:', parsedExpanded.length)
        console.log('parse expanded:', parsedExpanded)
        console.log('parsed', parsed.lastChild.lastChild)
        console.log('Parsed Node Name goes here ->',)

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 3) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsed.firstChild.firstChild.childNodes[1].nodeName === 'LINK') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    What if you want your project to not just be black and white? What if you want cool fonts, or bouncy animations? That’s where CSS comes in. CSS stands for Cascading Style Sheets. With CSS You can change the visual styles of html.
	Link
    Since our CSS is located in another file, we need to bring it in with a link tag. We bring it in like so: <link href = ‘style.css’ rel = ‘stylesheet’>. This will also need to be located between the <head> tags at the top. 
    Insert a link tag that links our CSS between the <head> tags.
    `;

    let task = `Insert a link tag that links our CSS between the <head> tags.`;

    let defaultAnswer = `
    <html>
        <head>
            <!-- YOUR CODE HERE -->
        </head>
        <body>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
            <link href = "styles.css" rel = "stylesheet">
        </head>
        <body>
        </body>
    </html>
    `;

    let hint = `Did you insert the link tag between the <head> tags?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/styling')
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
                <h1> Intro To CSS</h1>
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

export default IntroToCSS;