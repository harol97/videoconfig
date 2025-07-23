const QuizQuestion = ({ question, questionNumber, answer, onAnswerChange, onFlagToggle }) => {
  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple":
        return (
          <div className="px-40 py-40">
            <div className="mb-30">Select one:</div>
            {question.options.map((option, index) => (
              <div key={index} className="form-radio d-flex items-center mt-20">
                <div className="radio">
                  <input 
                    type="radio" 
                    name={`question-${question.id}`}
                    checked={answer === index.toString()}
                    onChange={() => onAnswerChange(index.toString())}
                  />
                  <div className="radio__mark">
                    <div className="radio__icon"></div>
                  </div>
                </div>
                <div className="fw-500 ml-12">
                  {String.fromCharCode(97 + index)}. {option}
                </div>
              </div>
            ))}
          </div>
        );
      
      case "fill":
        return (
          <form className="contact-form px-40 py-40">
            {question.parts.map((part, index) => (
              <div key={index} className="d-flex items-center mt-20">
                <div>{part}</div>
                <div className="col-auto ml-12">
                  <input 
                    type="text" 
                    placeholder="Text..." 
                    value={answer[index] || ''}
                    onChange={(e) => {
                      const newAnswer = [...(answer || [])];
                      newAnswer[index] = e.target.value;
                      onAnswerChange(newAnswer);
                    }}
                  />
                </div>
              </div>
            ))}
          </form>
        );
      
      case "truefalse":
        return (
          <div className="px-40 py-40">
            <div className="mb-20">Select one:</div>
            <div className="form-radio d-flex items-center">
              <div className="radio">
                <input 
                  type="radio" 
                  name={`question-${question.id}`}
                  checked={answer === "true"}
                  onChange={() => onAnswerChange("true")}
                />
                <div className="radio__mark">
                  <div className="radio__icon"></div>
                </div>
              </div>
              <div className="fw-500 ml-12">True</div>
            </div>
            <div className="form-radio d-flex items-center mt-20">
              <div className="radio">
                <input 
                  type="radio" 
                  name={`question-${question.id}`}
                  checked={answer === "false"}
                  onChange={() => onAnswerChange("false")}
                />
                <div className="radio__mark">
                  <div className="radio__icon"></div>
                </div>
              </div>
              <div className="fw-500 ml-12">False</div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`py-40 px-40 bg-dark-5 ${question.flagged ? 'bg-red-1' : ''}`}>
        <div className="d-flex justify-between">
          <h4 className="text-18 lh-1 fw-500 text-white">
            Question {questionNumber}
          </h4>
          <div className="d-flex x-gap-50">
            <div 
              className="d-flex items-center text-white cursor-pointer"
              onClick={onFlagToggle}
            >
              <div className={`icon-flag mr-10 ${question.flagged ? 'text-red-1' : ''}`}></div>
              <div>Flag Question</div>
            </div>
          </div>
        </div>

        <div className="d-flex pt-15">
          <div className="text-white">
            {answer ? "Answered" : "Not yet answered"}
          </div>
          <div className="text-white ml-50">
            Marked out of {question.points.toFixed(2)}
          </div>
        </div>

        <div className="text-20 lh-1 text-white mt-15">
          {question.text}
        </div>
      </div>

      {renderQuestionContent()}
    </>
  );
};

export default QuizQuestion;