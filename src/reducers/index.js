import {COLLECT_GUESS, SET_FEEDBACK, SET_AURAL_STATUS, RESET_GAME} from '../actions';

const initalState = {
  guesses: [],
  feedback: 'Make your guess!',
  auralStatus: '',
  correctAnswer: Math.floor(Math.random() * 100) + 1
}

export const gameReducer = (state = initalState, action) => {
  switch(action.type){
    //record all guesses
    case COLLECT_GUESS:
      return {...state, guesses: [...state.guesses, action.guess]};

    //feedback
    case SET_FEEDBACK:
      return {...state, feedback: action.feedback};

    //aural status
    case SET_AURAL_STATUS:
      const {feedback, guesses} = state;
      const pluralize = guesses.length !== 1;

      let auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;
    
      if (guesses.length > 0) {
        auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
      }
      return {...state, auralStatus};

    //reset game
    case RESET_GAME:
      return {...state,
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: '',
        correctAnswer: action.correctAnswer
      }

    default:
      return state;
  }
}