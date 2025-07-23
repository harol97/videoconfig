const QuizQuestion = ({ question, questionNumber, answer, onAnswerChange, onFlagToggle, mode }) => {
  const isAnswerCorrect = () => {
    if (!answer || mode !== 'review') return null;
    
    switch(question.type) {
      case "multiple":
        return parseInt(answer) === question.correctAnswer;
      case "truefalse":
        return answer === question.correctAnswer;
      case "fill":
        const studentAnswers = answer || [];
        return question.correctAnswers.every((correctAns, index) => 
          studentAnswers[index]?.toLowerCase().trim() === correctAns.toLowerCase().trim()
        );
      default:
        return null;
    }
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple":
        return (
          <div className="mt-4">
            <div className="mb-3">Select one:</div>
            {question.options.map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question.id}`}
                  id={`option-${question.id}-${index}`}
                  checked={answer === index.toString()}
                  onChange={() => onAnswerChange(index.toString())}
                  disabled={mode === 'review'}
                />
                <label className="form-check-label" htmlFor={`option-${question.id}-${index}`}>
                  {String.fromCharCode(65 + index)}. {option}
                </label>
                {mode === 'review' && index === question.correctAnswer && (
                  <span className="badge bg-success ms-2">Correct Answer</span>
                )}
              </div>
            ))}
          </div>
        );
      
      case "truefalse":
        return (
          <div className="mt-4">
            <div className="mb-3">Select one:</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                id={`true-${question.id}`}
                checked={answer === "true"}
                onChange={() => onAnswerChange("true")}
                disabled={mode === 'review'}
              />
              <label className="form-check-label" htmlFor={`true-${question.id}`}>
                True
              </label>
              {mode === 'review' && question.correctAnswer === "true" && (
                <span className="badge bg-success ms-2">Correct Answer</span>
              )}
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                id={`false-${question.id}`}
                checked={answer === "false"}
                onChange={() => onAnswerChange("false")}
                disabled={mode === 'review'}
              />
              <label className="form-check-label" htmlFor={`false-${question.id}`}>
                False
              </label>
              {mode === 'review' && question.correctAnswer === "false" && (
                <span className="badge bg-success ms-2">Correct Answer</span>
              )}
            </div>
          </div>
        );
      
      case "fill":
        return (
          <div className="mt-4">
            {question.parts.map((part, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <span>{part}</span>
                {index < question.parts.length - 1 && (
                  <input
                    type="text"
                    className="form-control mx-2"
                    style={{ width: '200px' }}
                    value={answer && answer[index] ? answer[index] : ''}
                    onChange={(e) => {
                      const newAnswer = [...(answer || [])];
                      newAnswer[index] = e.target.value;
                      onAnswerChange(newAnswer);
                    }}
                    disabled={mode === 'review'}
                  />
                )}
              </div>
            ))}
            {mode === 'review' && (
              <div className="mt-3">
                <strong>Correct answer:</strong> {question.correctAnswers.join(', ')}
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderFeedback = () => {
    if (mode !== 'review') return null;
    
    const correct = isAnswerCorrect();
    if (correct === null) return null;
    
    return (
      <div className={`alert ${correct ? 'alert-success' : 'alert-danger'} mt-3`}>
        {correct ? '✓ Correct' : '✗ Incorrect'}
      </div>
    );
  };

  return (
    <div className={`question-container ${question.flagged ? 'border border-warning' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Question {questionNumber}</h4>
        <div className="d-flex align-items-center">
          <div className="me-3">
            {answer ? (
              <span className="badge bg-success">Answered</span>
            ) : (
              <span className="badge bg-secondary">Not answered</span>
            )}
          </div>
          <button
            className={`btn btn-sm ${question.flagged ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={onFlagToggle}
          >
            <i className={`bi bi-flag${question.flagged ? '-fill' : ''}`}></i> Flag
          </button>
        </div>
      </div>

      <div className="mb-3">
        <span className="badge bg-info">{question.type.toUpperCase()}</span>
        <span className="ms-2">Points: {question.points.toFixed(1)}</span>
      </div>

      <div className="question-text mb-4">
        <h5>{question.text}</h5>
      </div>

      {renderQuestionContent()}
      {renderFeedback()}
    </div>
  );
};

export default QuizQuestion;