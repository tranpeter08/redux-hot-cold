import React from 'react';
import { connect } from 'react-redux';
import { collectGuess, setFeedback, setAuralStatus } from '../actions'

import './guess-form.css';

export class GuessForm extends React.Component {
  componentDidMount(){
    
  }

  onSubmit(event) {
    event.preventDefault();
    const value = this.input.value;
    
    // if (this.props.onMakeGuess) {
    //   this.props.onMakeGuess(value);
    // }

    const { guesses, correctAnswer, feedback } = this.props;
    //take input value add it to app state
    this.props.collectGuess(value);

    //set feedback depending on guess
    this.props.setFeedback(value, correctAnswer);
    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold'

    //set aural status depending on guess and feedback
    console.log('guess and feedback:', guesses, feedback);
    
    this.props.setAuralStatus();
    // console.log('aural(submit):', this.props.auralStatus)
    this.input.value = '';
    this.input.focus();
  }

  render() {
    console.log('correct answer:',this.props.correctAnswer)
    console.log('guesses:',this.props.guesses);
    console.log('feedback:', this.props.feedback);
    console.log('aural:', this.props.auralStatus)
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          type="number"
          name="userGuess"
          id="userGuess"
          className="text"
          min="1"
          max="100"
          autoComplete="off"
          aria-labelledby="feedback"
          ref={input => (this.input = input)}
          required
        />
        <button 
          type="submit"
          name="submit"
          id="guessButton" 
          className="button"
        >
          Guess
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  guesses: state.guesses,
  correctAnswer: state.correctAnswer,
  feedback: state.feedback,
  auralStatus: state.auralStatus
});

export default connect(mapStateToProps, {collectGuess, setFeedback, setAuralStatus})(GuessForm);