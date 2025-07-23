const QuizSidebar = ({ 
  questions, 
  currentQuestionIndex, 
  setCurrentQuestionIndex,
  completion,
  mode 
}) => {
  return (
    <div className="row y-gap-30">
      <div className="col-12">
        <div className="pt-20 pb-30 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
          <h5 className="text-17 fw-500 mb-30">
            {mode === 'take' ? 'Quiz Progress' : 'Quiz Builder'}
          </h5>
          <div className="d-flex items-center">
            <div className="progress-bar w-1/1">
              <div className="progress-bar__bg bg-light-3"></div>
              <div 
                className="progress-bar__bar bg-purple-1" 
                style={{ width: `${mode === 'take' ? completion : 100}%` }}
              ></div>
            </div>
            <div className="ml-15">
              {mode === 'take' ? `${completion}%` : `${questions.length} Questions`}
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="pt-20 pb-30 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
          <h5 className="text-17 fw-500 mb-30">
            {mode === 'take' ? 'Quiz Navigation' : 'Questions'}
          </h5>
          <div className="row x-gap-10 y-gap-10">
            {questions.map((q, index) => (
              <div key={q.id} className="col-auto">
                <button
                  className={`button -single-icon size-35 rounded-8 ${
                    currentQuestionIndex === index 
                      ? '-dark-1 text-white' 
                      : '-light-3 text-dark-1'
                  } ${q.flagged ? 'border-red-1' : ''}`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  <div className="text-15 lh-1 fw-500">{index + 1}</div>
                  {q.flagged && <div className="flag-indicator"></div>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;