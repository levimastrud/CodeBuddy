import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Lesson(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState('hide-hint');

    // Supports tabbing inside code block

    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1;
            }
            if (e.keyCode == 13) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0, this.selectionStart) + "\n" + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 2;
            }
        }
    }

    const codeBlock = useSelector((store) => store.codeBlock);
    let answer = useSelector((store) => store.answer);

    let defaultAnswer = props.defaultAnswer;

    let viewSolution = props.viewSolution;

    let lesson = props.lesson;

    let hint = props.hint;

    let task = props.task;

    let checkAnswer = props.checkAnswer;

    useEffect(() => {
        dispatch({ type: 'GET_CODE_BLOCK' });
        dispatch({ type: 'GET_ANSWER' });
    }, [dispatch]);

    return (
        <div className="flex-wrapper">
            <div className="lesson">
                <h2>{lesson}</h2>
            </div>
            <div className="blue">
                <div className="wrapper">
                    <h1>{answer}</h1>
                    <h2 className="task">{task}</h2>
                </div>
                <textarea value={codeBlock} onChange={(e) => {
                    dispatch({ type: 'SET_CODE_BLOCK', payload: e.target.value });
                }}></textarea>
                <h3 className={toggle}>{hint}</h3>
                <div className="pageButtons">
                    <button onClick={() => toggle ? setToggle('') : setToggle('hide-hint')}>Hint</button>
                    <button onClick={() => dispatch({ type: 'SET_CODE_BLOCK', payload: viewSolution })}>View Solution</button>
                    <button onClick={() => dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer })
                    }>Reset</button>
                    <button onClick={() => checkAnswer(codeBlock)}>Submit</button>
                </div>
            </div>
            <div className="preview">
                <h1>Preview</h1>
                <iframe srcDoc={codeBlock}></iframe>
            </div>
        </div>
    )
}

export default Lesson;