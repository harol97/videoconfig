const QuizResults = ({ results, onClose }) => {
  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Quiz Results</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <h2 className="mb-4">
              Your Score: {results.score} / {results.totalPossible}
            </h2>
            <div className="progress mb-4" style={{ height: '30px' }}>
              <div 
                className={`progress-bar ${results.percentage >= 70 ? 'bg-success' : results.percentage >= 50 ? 'bg-warning' : 'bg-danger'}`}
                role="progressbar"
                style={{ width: `${results.percentage}%` }}
                aria-valuenow={results.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {results.percentage}%
              </div>
            </div>
            {results.percentage >= 70 ? (
              <p className="text-success">Congratulations! You passed the quiz!</p>
            ) : (
              <p className="text-danger">You didn't pass this time. Try again!</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;