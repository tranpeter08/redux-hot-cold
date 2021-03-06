import React from 'react';
import { connect } from 'react-redux';
import { setFeedback } from '../actions';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.floor(Math.random() * 100) + 1
    };
  }

  restartGame() {
    this.setState({
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.floor(Math.random() * 100) + 1
    });
  }

  // makeGuess(aGuess) {
  //   const guess = parseInt(aGuess, 10);
  //   if (isNaN(guess)) {
  //     this.setState({ feedback: 'Please enter a valid number' });
  //     return;
  //   }

  //   const difference = Math.abs(guess - this.state.correctAnswer);

  //   let feedback;
  //   if (difference >= 50) {
  //     feedback = 'You\'re Ice Cold...';
  //   } else if (difference >= 30) {
  //     feedback = 'You\'re Cold...';
  //   } else if (difference >= 10) {
  //     feedback = 'You\'re Warm.';
  //   } else if (difference >= 1) {
  //     feedback = 'You\'re Hot!';
  //   } else {
  //     feedback = 'You got it!';
  //   }

  //   this.setState({
  //     feedback,
  //     guesses: [...this.state.guesses, guess]
  //   });

    // We typically wouldn't touch the DOM directly like this in React
    // but this is the best way to update the title of the page,
    // which is good for giving screen-reader users
    // instant information about the app.
  //   ;
  // }

  generateAuralUpdate() {
    const { guesses, feedback } = this.state;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }

    console.log('originalaural:',auralStatus);
    this.setState({ auralStatus });
  }

  render() {
   
    

    const { auralStatus } = this.state;
    const guessCount = this.props.guesses.length;
    const currentGuess = this.props.guesses[guessCount-1];
    console.log('current guess:', currentGuess);
    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          
        />
        <main role="main">
          <GuessSection
            feedback={this.props.feedback}
            guessCount={this.props.guesses.length}
            
          />
          <StatusSection guesses={this.props.guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ feedback, guesses, auralStatus }) => ({
  feedback,
  guesses,
  auralStatus
});

export default connect(mapStateToProps, { setFeedback })(Game);