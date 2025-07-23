import { useState } from "react";

const QuizEditor = ({ questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);

  const addQuestion = (type) => {
    const newQuestion = {
      id: questions.length + 1,
      text: "New question",
      type,
      options: type === "multiple" ? ["Option 1", "Option 2", "Option 3"] : [],
      correctAnswer: type === "multiple" ? 0 : "",
      points: 1.00,
      flagged: false
    };
    
    if (type === "fill") {
      newQuestion.parts = ["Complete this sentence"];
      newQuestion.correctAnswers = [""];
    }
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  };

  const deleteQuestion = (id) => {
    if (questions.length <= 1) {
      alert("You must have at least one question");
      return;
    }
    
    setQuestions(questions.filter(q => q.id !== id));
    setCurrentQuestionIndex(Math.min(currentQuestionIndex, questions.length - 2));
  };

  return (
    <div className="quiz-editor">
      <div className="d-flex mb-4">
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => addQuestion("multiple")}
        >
          Add Multiple Choice
        </button>
        <button 
          className="btn btn-outline-primary me-2"
          onClick={() => addQuestion("fill")}
        >
          Add Fill-in
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={() => addQuestion("truefalse")}
        >
          Add True/False
        </button>
      </div>

      {questions.length > 0 && (
        <div className="question-edit-container">
          <div className="d-flex justify-content-between mb-3">
            <h5>Editing Question {currentQuestionIndex + 1}</h5>
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => deleteQuestion(questions[currentQuestionIndex].id)}
            >
              Delete Question
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label">Question Text</label>
            <input
              type="text"
              className="form-control"
              value={questions[currentQuestionIndex].text}
              onChange={(e) => updateQuestion({
                ...questions[currentQuestionIndex],
                text: e.target.value
              })}
            />
          </div>

          {questions[currentQuestionIndex].type === "multiple" && (
            <div className="mb-3">
              <label className="form-label">Options</label>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="input-group mb-2">
                  <div className="input-group-text">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={questions[currentQuestionIndex].correctAnswer === index}
                      onChange={() => updateQuestion({
                        ...questions[currentQuestionIndex],
                        correctAnswer: index
                      })}
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...questions[currentQuestionIndex].options];
                      newOptions[index] = e.target.value;
                      updateQuestion({
                        ...questions[currentQuestionIndex],
                        options: newOptions
                      });
                    }}
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      const newOptions = questions[currentQuestionIndex].options
                        .filter((_, i) => i !== index);
                      updateQuestion({
                        ...questions[currentQuestionIndex],
                        options: newOptions,
                        correctAnswer: Math.min(
                          questions[currentQuestionIndex].correctAnswer,
                          newOptions.length - 1
                        )
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  const newOptions = [...questions[currentQuestionIndex].options, "New option"];
                  updateQuestion({
                    ...questions[currentQuestionIndex],
                    options: newOptions
                  });
                }}
              >
                Add Option
              </button>
            </div>
          )}

          {/* Similar editors for other question types */}
        </div>
      )}
    </div>
  );
};

export default QuizEditor;