//handles guess input
export const COLLECT_GUESS = 'COLLECT_GUESS';
export const collectGuess = (guess) => ({
  type: COLLECT_GUESS,
  guess 
})

//sets the feedback
export const SET_FEEDBACK = 'SET_FEEDBACK';
export const setFeedback = (aGuess, correctAnswer) => {
  const guess = parseInt(aGuess, 10);
  if (isNaN(guess)) {
    return {
      type: SET_FEEDBACK,
      feedback: 'Please enter a valid number'
    };
  }

  const difference = Math.abs(guess - correctAnswer);

  let feedback;
  if (difference >= 50) {
    feedback = 'You\'re Ice Cold...';
  } else if (difference >= 30) {
    feedback = 'You\'re Cold...';
  } else if (difference >= 10) {
    feedback = 'You\'re Warm.';
  } else if (difference >= 1) {
    feedback = 'You\'re Hot!';
  } else {
    feedback = 'You got it!';
  }

  return {
  type: SET_FEEDBACK,
  feedback
  }
}

//handles aural feedback
export const SET_AURAL_STATUS = 'SET_AURAL_STATUS';
export const setAuralStatus = () => ({
  type: SET_AURAL_STATUS,
});

//handles rest game
export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => {
  const correctAnswer = Math.floor(Math.random() * 100) + 1;
  return {
    type: RESET_GAME,
    correctAnswer
  }
}