const QuizSidebar = ({ 
  questions, 
  currentQuestionIndex, 
  setCurrentQuestionIndex,
  completion
}) => {
  return (
    <div className="quiz-sidebar">
      {/* Quiz Complete section */}
      <div className="quiz-complete-section">
        <h3 className="quiz-complete-title">Quiz Complete</h3>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${completion}%` }}>
            <span className="progress-text">{completion}%</span>
          </div>
        </div>
      </div>

      {/* Quiz Navigation section */}
      <div className="quiz-navigation-section">
        <h3 className="navigation-title">Quiz Navigation</h3>
        <div className="question-numbers">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`number-button ${currentQuestionIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="finish-button">Finish</button>
      </div>
    </div>
  );
};

export default QuizSidebar;