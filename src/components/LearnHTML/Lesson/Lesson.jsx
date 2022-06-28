import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CB_Default from '../CodeBuddy Graphics/CB_Default.svg';
import CB_Blink from '../CodeBuddy Graphics/CB_Blink.svg';
import CB_Annoyed from '../CodeBuddy Graphics/CB_Annoyed.svg';
import Circuit from '../CodeBuddy Graphics/Curcuit.svg'

function Lesson(props) {

    const dispatch = useDispatch();

    // Local state used only to toggle hint

    const [toggle, setToggle] = useState('hide-hint');
    const [toggleSubmit, setToggleSubmit] = useState('show');
    const [annoyed, setAnnoyed] = useState(false);
    const [cbStatus, setCbStatus] = useState(CB_Default);

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

    // Reducers

    const codeBlock = useSelector((store) => store.codeBlock);
    const answer = useSelector((store) => store.answer);

    // All data that needs to be brought in through the
    // topic components

    let defaultAnswer = props.defaultAnswer;
    let viewSolution = props.viewSolution;
    let lesson = props.lesson;
    let hint = props.hint;
    let task = props.task;
    let checkAnswer = props.checkAnswer;

    // Styles code elements in lesson 

    const stringSpanner = (text) => {
        let spannedLesson = text.replace('<h1>', "<span class = 'spannedLesson'><h1></span>");
        console.log(spannedLesson)
        lesson = spannedLesson;
    };

    const annoyCB = () => {
        setTimeout(
            () => {
                setAnnoyed(true)
            }, 
            0
          );
          setTimeout(
            () => setAnnoyed(false), 
            700
          );
    }

    const blinkCB = () => {
        setInterval(
            () => {
                setTimeout(
                    () => {
                        setCbStatus(CB_Blink)
                    }, 
                    0
                  );
                  setTimeout(
                    () => setCbStatus(CB_Default), 
                    300
                  )
            }, 
            5000
          );
        //   setInterval(
        //     () => setCbStatus(CB_Default), 
        //     4000
        //   );
    }

    // useEffect will fetch most up to date answer and code block on load

    useEffect(() => {
        dispatch({ type: 'GET_CODE_BLOCK' });
        dispatch({ type: 'SET_ANSWER', payload: '' });
        stringSpanner(lesson);
        blinkCB();
    }, [dispatch]);

    return (
        <div className="flex-wrapper">
            <img src={Circuit} className='curcuit' />
            <div className="lesson">
                <p>{lesson}</p>
            </div>
            <div className="code">
                <div className='task-and-cb'>
                    <img className='code-buddy' onClick={() => annoyCB()} src={annoyed ? CB_Annoyed : cbStatus}></img>
                    <h2 className="task">{task}</h2>
                </div>
                <textarea value={codeBlock} onChange={(e) => {
                    dispatch({ type: 'SET_CODE_BLOCK', payload: e.target.value });
                }}></textarea>
                <h3 className={toggle}>{hint}</h3>
                <div className="pageButtons">
                    <button onClick={() => toggle ? setToggle('') : setToggle('hide-hint')}>Hint</button>
                    {toggleSubmit ? <button onClick={() => {
                        if (!toggleSubmit) {
                            setToggleSubmit('show');
                        } else {
                            setToggleSubmit('');
                        }
                        dispatch({ type: 'SET_CODE_BLOCK', payload: viewSolution })
                    }
                    }>View Solution</button> : ''}
                    <button onClick={() => {
                        dispatch({ type: 'SET_CODE_BLOCK', payload: defaultAnswer })
                        dispatch({ type: 'SET_ANSWER', payload: '' });
                        setToggleSubmit('show');
                    }
                    }>Reset</button>
                    {toggleSubmit ? <button onClick={() => checkAnswer(codeBlock)}>Submit</button> : ''}
                    <h1>{answer ? answer + '!' : ''}</h1>
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