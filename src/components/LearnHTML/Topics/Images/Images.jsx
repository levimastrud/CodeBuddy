import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function Images() {
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
        console.log('Parsed Node Name goes here ->', parsedExpanded[3].ATTRIBUTE_NODE )

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 5) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[3].nodeName === 'IMG' && parsedExpanded[3].ATTRIBUTE_NODE === 2) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Images can be a great way to add flair to your page. An image tag looks like this <img src = “funny-cat.png” alt = “A funny cat”>
    The image tag is unique because it is one of few HTML tags that does not have a closing tag.
    It does require the two attributes src and alt.
    Src - this is the source of an image. This could be a link to another image on the internet or just referencing a file on your local computer.
    Alt - this is the alternate text for the image. If for whatever reason your image doesn’t load properly, the alternate text will describe what should be there.
    `;

    let task = `Create an image with a source of “https://bit.ly/3OFG8PE"” and an alt of “Some cute kittens”`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <style>
                img {
                    width: 20em;
                }
            </style>

        <! -- YOUR CODE HERE -->

        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <style>
            img {
                width: 20em;
            }
            </style>
            <img src = "https://bit.ly/3OFG8PE" alt = "Some cute kittens">
        </body>
    </html>
    `;

    let hint = `Do you have a src and alt attribute?`

    let quizOptions = {
        topic: 'images_results',
        router: 'images',
        nextTopic: 4,
        // First Question
        question1: 'What is the purpose of the src attribute?',
        o1: {question: 'Describes how big the image is', value: 0},
        o2: {question: `Describes the image if the image doesn't load`, value: 0},
        o3: {question: 'Creates the image', value: 0},
        o4: {question: 'Specify the path to the image', value: 1},
        // Second Question
        question2: 'When would the alt attribute be useful?',
        o5: {question: `When you aren't sure what you want the image to be`, value: 0},
        o6: {question: `To describe what the image would be if the page doesn't load`, value: 1},
        o7: {question: 'To specify how big an image should be', value: 0},
        o8: {question: 'When you want to link to a gif or video', value: 0},
        // Third Question
        question3: 'Which image is written properly?',
        o9: {question:`<img src="dogs.jpg" alt = "photo of dogs"> </img>`, value: 0},
        o10: {question: `<img src="dogs.jpg" alt = "photo of dogs">`, value: 1},
        o11: {question: `<imgage src="photo of dogs" alt = "dogs.jpg">`, value: 0},
        o12: {question: `<img src="photo of dogs" alt = "dogs.jpg">`, value: 0},
        // Fourth Question
        question4: 'How many list items can go in a list?',
        o13: {question: `List items don't go in lists`, value: 0},
        o14: {question: 'Five', value: 0},
        o15: {question: 'As many as you want', value: 1},
        o16: {question: 'Eleventeen', value: 0},
        // Fifth Question
        question5: 'The image tag does not have a closing tag.',
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
                <h1> Images </h1>
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

export default Images;