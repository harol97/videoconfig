function QuizControls({
  currentQuestionIndex,
  totalQuestions,
  setCurrentQuestionIndex,
  submitAnswer,
  answers,
  currentQuestionId
}) {
  return (
    <div className="quiz-navigation mt-4">
      <button
        className="btn btn-outline-secondary me-2"
        disabled={currentQuestionIndex === 0}
        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
      >
        Previous
      </button>
      
      <button
        className="btn btn-primary"
        disabled={!answers[currentQuestionId]}
        onClick={submitAnswer}
      >
        Submit Answer
      </button>
      
      <button
        className="btn btn-outline-secondary ms-2"
        disabled={currentQuestionIndex === totalQuestions - 1}
        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
      >
        Next
      </button>
      
      <div className="progress mt-3">
        <div 
          className="progress-bar" 
          role="progressbar" 
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions * 100)}` }}
          aria-valuenow={currentQuestionIndex + 1}
          aria-valuemin="0"
          aria-valuemax={totalQuestions}
        >
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>
    </div>
  );
}

export default QuizControls;