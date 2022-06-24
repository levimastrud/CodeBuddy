import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Lesson from '../../Lesson/Lesson';

function Table() {
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
        console.log('Parsed Node Name goes here ->', )

        // Determines whether or not codeBlock is correct.
        // This will need to be modified for every different topic.

        try {
            if (parsedExpanded.length < 5) {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
            if (parsedExpanded[3].nodeName === 'TABLE' && parsedExpanded[3].childNodes[1].childNodes[0].childNodes[1].nodeName === 'TH' && parsedExpanded[3].childNodes[1].childNodes[2].childNodes[1].nodeName === 'TD') {
                dispatch({ type: 'SET_ANSWER', payload: 'Correct' });
            } else {
                dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
            }
        } catch {
            dispatch({ type: 'SET_ANSWER', payload: 'Incorrect' });
        }
    }

    let lesson = `
    Table
    Eventually after collecting all these inputs from the user, you will want a nice, organized place to put them. Tables are perfect for this.
    To create a table, use the <table> tag. 
    A table is composed of columns and rows. 
    Each table row will need to be defined with a <tr> tag. Inside that will be the table table data. This will either be a <th> if it is a heading and belongs at the top, or a <td> if it is data meant to be inserted below the heading.
    Here is a basic example of what a table might look like:
    <table>
			<tr>
				<th>  First Name </th>
				<th>  Last Name </th>
				<th>  Favorite Candy </th>
			</tr>
			<tr>
				<td>  Bruce </td>
				<td>  Mangosteen </td>
				<td>  Good & Plenty </td>
			</tr>
    </table>
    `;

    let task = `Create a table with one table row that contains two table headers that say ‘First Name’ and 'Last Name' and another table row that contains two table datas with your first and last name!`;

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

            <!-- YOUR CODE HERE -->

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

    let hint = `Is your 'First name' and 'Last name' table headers inside <th> tags and <tr> tags?`

    const isReady = () => {
        if (answer === 'Correct') {
            history.push('/thead-and-tbody')
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
                <h1> Tables </h1>
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

export default Table;