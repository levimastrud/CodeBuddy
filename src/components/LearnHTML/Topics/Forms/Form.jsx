import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function Form() {
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

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 3) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[1].nodeName === 'FORM' && parsedExpanded[1].childNodes[1].nodeName === 'INPUT') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Form
    Forms are used to gather user input. They are incredibly useful! To create a form, use the <form> tag.
    Inputs
    Inside the form tag, we will need inputs for the user to insert their input. The input tag is another tag which does not have a closing tag. It just looks like this <input>
    Type of inputs
    There are many different types of inputs and they all have their uses! For now we will just use <input type = ‘text’>, but we encourage you to mess around with the other types when you are more comfortable. You can find more documentation on inputs here: https://www.w3schools.com/html/html_form_input_types.asp
    `;

    let task = `Create a form with an input inside of it!`;

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
            <form>
                <input>
                </input>
            </form>
        </body>
    </html>
    `;

    let hint = `Did you accidentally add a closing tag to the input?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/labels')
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
                <h1> Forms </h1>
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

export default Form;