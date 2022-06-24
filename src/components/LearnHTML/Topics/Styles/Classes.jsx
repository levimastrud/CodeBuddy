import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function Classes() {
    const user = useSelector((store) => store.user);
    const answer = useSelector((store) => store.answer);
    const history = useHistory()
    const dispatch = useDispatch();

    const checkAnswer = (codeBlock) => {

        const parser = new DOMParser();
        const parsed = parser.parseFromString(codeBlock, "text/html");
        let parsedExpanded = parsed.lastChild.lastChild.childNodes;
        let wtfString = parsedExpanded[1].textContent.replace(/\r?\n/g, '');


        // Logs used for programming check answer logic 

        console.log('parse expanded length:', parsedExpanded.length)
        console.log('parse expanded:', parsedExpanded)
        console.log('parsed', parsed.lastChild.lastChild)
        console.log('WTF:', wtfString)
        console.log('Parsed Node Name goes here ->', wtfString.search('.make-me-red'))

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 7) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (wtfString.search('.make-me-red') > 1 && wtfString.search('#make-me-blue')) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    But what if we don’t want to style ALL of our h1 elements? What if we want to style just one at the top? That is where classes come in. With classes you can specify elements you want styled.
    <h1 class = ‘make-me-red’> Red! </h1>
    Targeting a class is just like targeting an element, you just need to add a ‘.’ before the target.
    If we want to get even more specific with our targeting, we can use an ID instead of a class. IDs are more powerful than a class, but there can only be one element with the same  ID, otherwise there will be errors.
    When targeting an ID in CSS, use a ‘#’ instead of a ‘.’     
    `;

    let task = `Style the class ‘make-me-red’ to have a color of red and style the id ‘make-me-blue' to have a color of blue!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <style>
                <! -- YOUR CODE HERE -->
            </style>
            <h1 class = "make-me-red"> Red </h1>
            <h1 id = "make-me-blue"> Blue </h1>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <style>
                .make-me-red {
                    color: red;
                }
                #make-me-blue {
                    color: blue;
                }
            </style>
            <h1 class = "make-me-red"> Red </h1>
            <h1 id = "make-me-blue"> Blue </h1>
        </body>
    </html>
    `;

    let hint = `Are you using a '.' before targeting class names and a '#' before targeting an id?`

    let quizOptions = {
        topic: 'styles_results',
        router: 'styles',
        nextTopic: 6,
        // First Question
        question1: 'How would you style all h1 elements to be red?',
        o1: {question: 'h1 { color: red; }', value: 1},
        o2: {question: `<h1 color: red>`, value: 0},
        o3: {question: 'h1 { text-color: red; }', value: 0},
        o4: {question: 'color { h1: red }', value: 0},
        // Second Question
        question2: 'How would you style all classes named ‘santa-clause’ to be red?',
        o5: {question: `#santa-clause { color: red; }`, value: 0},
        o6: {question: `color { santa-clause: red }`, value: 0},
        o7: {question: '.santa-clause { color: red; }', value: 1},
        o8: {question: 'santa-clause { color: red; }', value: 0},
        // Third Question
        question3: 'What tag is used to connect CSS to HTML?',
        o9: {question:`<a>`, value: 0},
        o10: {question: `<link>`, value: 1},
        o11: {question: `<href>`, value: 0},
        o12: {question: `<src>`, value: 0},
        // Fourth Question
        question4: 'How do you target an ID?',
        o13: {question: `By putting a '.' before the targeting`, value: 0},
        o14: {question: 'Using a target attribute in the HTML', value: 0},
        o15: {question: `By putting a '#' before the targeting`, value: 1},
        o16: {question: 'Next to the color specification', value: 0},
        // Fifth Question
        question5: 'You should not have more than one element with the same ID in an HTML document.',
        o17: {question: 'True', value: 1},
        o18: {question: 'False', value: 0},
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
                <h1> Classes </h1>
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

export default Classes;