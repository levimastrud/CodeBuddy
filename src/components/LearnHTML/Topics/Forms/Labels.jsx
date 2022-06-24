import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function Labels() {
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
            if (parsedExpanded[1].nodeName === "FORM" && parsedExpanded[1].childNodes[1].nodeName === 'LABEL' && parsedExpanded[1].childNodes.length >= 10 ) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else if (parsedExpanded[1].nodeName === "FORM" && parsedExpanded[1].childNodes[1].nodeName === 'INPUT' && parsedExpanded[1].childNodes.length >= 10 ) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            }
             else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    When working with just HTML, an easy way to tell the user where to input data and what to input, is with labels.
    To use labels, you need to give each input an ID. It is best practice to make the ID the data you are expecting to receive.
    Then, you create a <label> tag that references that ID using a ‘for’ attribute. This will look like this:
    <form>
    <label for ‘first-name’> First Name: </label>
    <input type = ‘text’ id = ‘first-name’>
    </form>        
    `;

    let task = `Create a form with two inputs inside of it with a label for each input!`;

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
                <label for = 'input1'>First Name:</label>
                <input id = 'input1'>
                <br>
                <label for = 'input2'>Last Name:</label>
                <input id = 'input2'>
            </form>
        </body>
    </html>
    `;

    let hint = `Do your inputs have id's and are the labels referencing them?`

    let quizOptions = {
        topic: 'forms_results',
        router: 'forms',
        nextTopic: 6,
        // First Question
        question1: 'What is a good way to tell the user what to put in an input?',
        o1: {question: 'Labels', value: 1},
        o2: {question: `With code comments`, value: 0},
        o3: {question: 'With styline', value: 0},
        o4: {question: 'Placeholders', value: 1},
        // Second Question
        question2: 'What do we have to give an input in order to use labels?',
        o5: {question: `Class`, value: 0},
        o6: {question: `Label`, value: 0},
        o7: {question: 'Id', value: 1},
        o8: {question: 'Href', value: 0},
        // Third Question
        question3: 'What type of tags go inside a form to allow user input?',
        o9: {question:`<input>`, value: 1},
        o10: {question: `<data>`, value: 0},
        o11: {question: `<href>`, value: 0},
        o12: {question: `<submit>`, value: 0},
        // Fourth Question
        question4: 'Which form is written correctly?',
        o13: {question: `<input> <label> </label> </input>`, value: 0},
        o14: {question: '<form> <label> </label> </form>', value: 0},
        o15: {question: `<form> <input> </input> </form>`, value: 1},
        o16: {question: '<form> <input> <input> <form>', value: 0},
        // Fifth Question
        question5: 'Inputs have a closing tag.',
        o17: {question: 'True', value: 0},
        o18: {question: 'False', value: 1},
    }

    const isReady = () => {
        if (answer === 'Correct') {
            dispatch({ type: 'SET_QUIZ', payload: quizOptions });
            dispatch({ type: 'SET_ANSWER', payload: '' });
            history.push('/quiz-page-one');
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
                <h1> Labels </h1>
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

export default Labels;