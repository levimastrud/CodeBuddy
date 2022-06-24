import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function Target() {
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
            if (parsedExpanded[1].nodeName === 'A' && parsedExpanded[1].attributes.length === 2) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    The target specifies how the image will open. This is optional and by default the link will open in your current tab. 
    _self - Default. Opens the document in the same window/tab as it was clicked
    _blank - Opens the document in a new tab
    _parent - Opens the document in the parent frame
    _top - Opens the document in the full body of the window
    Create a link to ‘candy.com’ that opens in a new tab!
    Image Link
    We can combine what we learned with the images and with the links to make a clickable image! You do this by inserting an <img> tag between two link tags. This would look like: <a href = "dogs.com" alt = "cute dogs"><img src = "dogs.jpg"></a>   
    `;

    let task = `Create a link to ‘candy.com’ that opens in a new tab!`;

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
            <a href = "candy.com" target = "_blank"> Candy </a>
        </body>
    </html>
    `;

    let hint = `Do you have a target attribute?`

    let quizOptions = {
        topic: 'links_results',
        router: 'links',
        nextTopic: 4,
        // First Question
        question1: 'What does the href attribute do?',
        o1: {question: 'Opens the link in a new window', value: 0},
        o2: {question: 'Specifies the text of the link', value: 0},
        o3: {question: 'Specifies where the link will go', value: 0},
        o4: {question: 'Provides a source for an image', value: 0},
        // Second Question
        question2: 'How would you make a link open in a new tab?',
        o5: {question: 'Set the target atribute to "_self"', value: 0},
        o6: {question: 'Set the target atribute to "_top"', value: 0},
        o7: {question: 'Set the target atribute to "_blank"', value: 1},
        o8: {question: 'Set the target atribute to "_parent"', value: 0},
        // Third Question
        question3: 'Which link is formatted correctly?',
        o9: {question:`<a href = "link.com" target = "_blank"> Link </a>`, value: 1},
        o10: {question:`<a href = "link.com" target = "blank"> Link </a>`, value: 0},
        o11: {question:`<a href = "link.com" target = "_blank" text = "link">`, value: 0},
        o12: {question:`<a src = "link.com" target = "_blank"> Link </a>`, value: 0},
        // Fourth Question
        question4: 'How do you create an image that is a link?',
        o13: {question: `List items don't go in lists`, value: 0},
        o14: {question: 'Putting an <img> tag between <a> tags', value: 1},
        o15: {question: 'As many as you want', value: 0},
        o16: {question: 'Eleventeen', value: 0},
        // Fifth Question
        question5: 'Having a target attribute is required.',
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
                <h1>Target Attribute</h1>
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

export default Target;