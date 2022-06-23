import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function ListItem() {
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
        console.log('Parsed Node Name goes here ->', parsedExpanded[1].childNodes[1].nodeName)

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 3) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[1].nodeName === 'OL' && parsedExpanded[1].childNodes[1].nodeName === 'LI' && parsedExpanded[1].childNodes[3].nodeName === 'LI' && parsedExpanded[1].childNodes[5].nodeName === 'LI') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    However, we can not have a list without list items! List items go inside the list tag (<ol> or <ul>) and represent the content inside of the list. You can have as many list items as you want!
    A list item tag looks like this: <li> List item! </li>    
    `;

    let task = `Create an ordered list with your top three favorite movies!`;

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
                <ol>
                    <li> Bottle Rocket </li>
                    <li> Isle of Dogs </li>
                    <li> The Life Aquatic </li>
                </ol>
        </body>
    </html>
    `;

    let hint = `Are all the list items inside an <ol> tag?`

    let quizOptions = {
        topic: 'lists_results',
        router: 'lists',
        nextTopic: 3,
        // First Question
        question1: 'What is the main difference between ordered lists and unordered lists?',
        o1: {question: 'Ordered lists number each item', value: 1},
        o2: {question: 'Nothing, they are the same', value: 0},
        o3: {question: 'Unordered is randomly sorted', value: 0},
        o4: {question: 'The only difference is the tags', value: 0},
        // Second Question
        question2: 'Which tag goes between opening and closing list tags?',
        o5: {question: '<ol> </ol>', value: 0},
        o6: {question: '<list> </list>', value: 0},
        o7: {question: '<listitem> </listitem>', value: 0},
        o8: {question: '<li> </li> ', value: 1},
        // Third Question
        question3: 'Which list is properly formatted?',
        o9: {question:`
        <li>
            <ol> Item! </ol>
        </li>
        `, value: 0},
        o10: {question: `
        <ul>
            <li> Item! </li>
        </ul>
        `, value: 1},
        o11: {question: `
        <ul>
            <li> Item! </li>
        <ul>
        `, value: 0},
        o12: {question: `
        <ol>
            <ol> Item! </ol>
        </ol>
        `, value: 0},
        // Fourth Question
        question4: 'How many list items can go in a list?',
        o13: {question: `List items don't go in lists`, value: 0},
        o14: {question: 'Five', value: 0},
        o15: {question: 'As many as you want', value: 1},
        o16: {question: 'Eleventeen', value: 0},
        // Fifth Question
        question5: 'Which list tag would I use if I didn’t care about order?',
        o17: {question: '<ul>', value: 1},
        o18: {question: '<li>', value: 0},
        o19: {question: '<ol>', value: 0},
        o20: {question: '<list>', value: 0},
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
                <h1>List Item</h1>
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

export default ListItem;