import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function THeadAndTBody() {
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
            if (parsedExpanded[3].childNodes[1].nodeName === 'THEAD' && parsedExpanded[3].childNodes[3].nodeName === 'TBODY') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Tables can get large quickly, so it is a good idea to have them be as organized as possible. 
    <thead> and <tbody> just define what is in the table head and table body. A great way to quickly tell how a table works.    
    `;

    let task = `Add <thead> and <tbody> to our table!`;

    let defaultAnswer = `
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
                <tr>
                    <th> First Name </th>
                    <th> Last Name </th >
                </tr>
                <tr>
                    <td> ${user.name} </td>
                    <td> Hackerson </td>
                </tr>
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

    let hint = `Do your <thead> and <tbody> tags have <tr> tags inside them?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/table-borders')
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
                <h1> THeadAndTBodys </h1>
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

export default THeadAndTBody;