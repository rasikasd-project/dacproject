import React, { Component } from 'react';
import Question from './question/Question';
import './QuizMain.css';
import Answer from './answer/Answer';

export default class extends Component {

    state = {
        questions: {
            1: 'Process of removing an element from stack is called?',
            2: 'In a stack, if a user tries to remove an element from an empty stack it is called?',
            3: 'Process of inserting an element in stack is called?'
        },
        answers: {
            1: {
                1: 'Create',
                2: 'Push',
                3: 'Pop'
            },
            2: {
                1: 'Underflow',
                2: 'Empty collections',
                3: 'Overflow'
            },
            3: {
                1: 'Pop',
                2: 'Push',
                3: 'Evaluation'
            }
        },
        correctAnswers: {
            1: '3',
            2: '1',
            3: '2'
        },

        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer

            });
        }
        else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { questions, answers, clickedAnswer, correctAnswer, step, score } = this.state;
        return(
        <div className="content">

{step <= Object.keys(questions).length ? 
                    (<>
                        <Question
                            question={questions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(questions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
          
        </div>
        );
    }
}
