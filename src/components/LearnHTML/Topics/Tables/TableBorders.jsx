import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';
import Quiz from '../../Quiz/QuizPageOne';

function TableBorders() {
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
        console.log('Parsed Node Name goes here ->',)
        console.log('WTF:', wtfString)
        console.log('Parsed Node Name goes here ->', wtfString.search('border'))

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 3) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if ( wtfString.search('border') > 1 && wtfString.search('collapse') > 1 && wtfString.search('table') > 1) {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            }
             else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `Typically tables we look at have borders. So in our CSS file we should be able to:
    table {
    border: 1 px solid black;
    }
    Right?
    Well yes. But by default, borders on tables will apply a border to the whole table, as well as each cell.
    To avoid this, we just need to set the ‘border-collapse’ property to ‘collapse’.           
    `;

    let task = `Add a border to our table and give it the border collapse!`;

    let defaultAnswer = `
    <html>
        <head>
        </head>
        <body>
            <style>

                <!-- YOUR CODE HERE -->

            </style>
            <table>
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name </th >
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> ${user.name} </td>
                        <td> Hackerson </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>
    `;

    let viewSolution = `
    <html>
        <head>
        </head>
        <body>
            <style>
                table, tr, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    padding: 15px;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name </th >
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> ${user.name} </td>
                        <td> Hackerson </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>
    `;

    let hint = `Did you target table within the <style> tag?`

    let quizOptions = {
        topic: 'tables_results',
        router: 'tables',
        nextTopic: 9,
        // First Question
        question1: 'Which tag is used to create a table?',
        o1: {question: '<thead>', value: 0},
        o2: {question: `<table>`, value: 1},
        o3: {question: '<td>', value: 0},
        o4: {question: '<tr>', value: 0},
        // Second Question
        question2: 'How do you create a table row?',
        o5: {question: `<row>`, value: 0},
        o6: {question: `<th>`, value: 0},
        o7: {question: '<tr>', value: 1},
        o8: {question: '<td>', value: 0},
        // Third Question
        question3: 'What does <thead> and <tbody> do?',
        o9: {question:`Adds a row to a table`, value: 0},
        o10: {question: `Creates header and body of table`, value: 0},
        o11: {question: `Organizes the header and body sections of a table`, value: 1},
        o12: {question: `Removes the border from a table`, value: 0},
        // Fourth Question
        question4: 'Why would you collapse the borders?',
        o13: {question: `Because by default tables have a border on the table cell aswell`, value: 1},
        o14: {question: 'In case you wanted the table to have rounded corners', value: 0},
        o15: {question: `If you wanted to change the background color of a table`, value: 0},
        o16: {question: 'Because some men just want to watch borders collapse.', value: 0},
        // Fifth Question
        question5: 'Which is the proper order of elements?',
        o17: {question: 'Table -> Tr -> Thead -> Tr', value: 0},
        o18: {question: 'Table -> Thead -> Tr -> Td', value: 1},
        o19: {question: 'Table -> Tr -> Thead -> Tbody', value: 0},
        o20: {question: 'Table -> Thead -> Tr -> Th', value: 1}
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

export default TableBorders;