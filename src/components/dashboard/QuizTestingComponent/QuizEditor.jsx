import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const QuizEditor = ({ questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex }) => {
  const addQuestion = (type) => {
    const newQuestion = {
      id: uuidv4(),
      text: "New question",
      type,
      points: 1.0,
      flagged: false
    };

    switch(type) {
      case "multiple":
        newQuestion.options = ["Option 1", "Option 2", "Option 3"];
        newQuestion.correctAnswer = 0;
        break;
      case "truefalse":
        newQuestion.correctAnswer = "true";
        break;
      case "fill":
        newQuestion.parts = ["Part before blank", "Part after blank"];
        newQuestion.correctAnswers = ["answer"];
        break;
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

  const moveQuestion = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
    setQuestions(newQuestions);
    setCurrentQuestionIndex(newIndex);
  };

  const renderQuestionEditor = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="question-editor">
        <div className="mb-3">
          <label className="form-label">Question Type</label>
          <select
            className="form-select"
            value={question.type}
            onChange={(e) => {
              const newQuestion = { ...question, type: e.target.value };
              // Reset question structure when type changes
              switch(e.target.value) {
                case "multiple":
                  newQuestion.options = ["Option 1", "Option 2", "Option 3"];
                  newQuestion.correctAnswer = 0;
                  delete newQuestion.parts;
                  delete newQuestion.correctAnswers;
                  break;
                case "truefalse":
                  newQuestion.correctAnswer = "true";
                  delete newQuestion.options;
                  delete newQuestion.parts;
                  delete newQuestion.correctAnswers;
                  break;
                case "fill":
                  newQuestion.parts = ["Part before blank", "Part after blank"];
                  newQuestion.correctAnswers = ["answer"];
                  delete newQuestion.options;
                  delete newQuestion.correctAnswer;
                  break;
              }
              updateQuestion(newQuestion);
            }}
          >
            <option value="multiple">Multiple Choice</option>
            <option value="truefalse">True/False</option>
            <option value="fill">Fill in the Blank</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Question Text</label>
          <textarea
            className="form-control"
            rows="3"
            value={question.text}
            onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Points</label>
          <input
            type="number"
            className="form-control"
            min="0.5"
            step="0.5"
            value={question.points}
            onChange={(e) => updateQuestion({ ...question, points: parseFloat(e.target.value) })}
          />
        </div>

        {question.type === "multiple" && (
          <div className="mb-3">
            <label className="form-label">Options</label>
            {question.options.map((option, index) => (
              <div key={index} className="input-group mb-2">
                <div className="input-group-text">
                  <input
                    className="form-check-input mt-0"
                    type="radio"
                    name={`correct-option-${question.id}`}
                    checked={question.correctAnswer === index}
                    onChange={() => updateQuestion({ ...question, correctAnswer: index })}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index] = e.target.value;
                    updateQuestion({ ...question, options: newOptions });
                  }}
                />
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => {
                    const newOptions = question.options.filter((_, i) => i !== index);
                    updateQuestion({
                      ...question,
                      options: newOptions,
                      correctAnswer: Math.min(question.correctAnswer, newOptions.length - 1)
                    });
                  }}
                  disabled={question.options.length <= 2}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                updateQuestion({
                  ...question,
                  options: [...question.options, `Option ${question.options.length + 1}`]
                });
              }}
            >
              Add Option
            </button>
          </div>
        )}

        {question.type === "truefalse" && (
          <div className="mb-3">
            <label className="form-label">Correct Answer</label>
            <select
              className="form-select"
              value={question.correctAnswer}
              onChange={(e) => updateQuestion({ ...question, correctAnswer: e.target.value })}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}

        {question.type === "fill" && (
          <div className="mb-3">
            <label className="form-label">Fill in the Blank Parts</label>
            {question.parts.map((part, index) => (
              <div key={index} className="mb-3">
                <div className="mb-2">
                  <label className="form-label">Question Part {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={part}
                    onChange={(e) => {
                      const newParts = [...question.parts];
                      newParts[index] = e.target.value;
                      updateQuestion({ ...question, parts: newParts });
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Correct Answer for Blank {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={question.correctAnswers[index] || ''}
                    onChange={(e) => {
                      const newAnswers = [...question.correctAnswers];
                      newAnswers[index] = e.target.value;
                      updateQuestion({ ...question, correctAnswers: newAnswers });
                    }}
                  />
                </div>
                <button
                  className="btn btn-outline-danger mb-3"
                  type="button"
                  onClick={() => {
                    const newParts = question.parts.filter((_, i) => i !== index);
                    const newAnswers = question.correctAnswers.filter((_, i) => i !== index);
                    updateQuestion({
                      ...question,
                      parts: newParts,
                      correctAnswers: newAnswers
                    });
                  }}
                  disabled={question.parts.length <= 1}
                >
                  Remove This Blank
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                updateQuestion({
                  ...question,
                  parts: [...question.parts, ''],
                  correctAnswers: [...question.correctAnswers, '']
                });
              }}
            >
              Add Another Blank
            </button>
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this question?")) {
                deleteQuestion(question.id);
              }
            }}
          >
            Delete Question
          </button>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => moveQuestion(currentQuestionIndex, 'up')}
              disabled={currentQuestionIndex === 0}
            >
              Move Up
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => moveQuestion(currentQuestionIndex, 'down')}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Move Down
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button 
          className="btn btn-primary"
          onClick={() => addQuestion("multiple")}
        >
          Add Multiple Choice
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => addQuestion("truefalse")}
        >
          Add True/False
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => addQuestion("fill")}
        >
          Add Fill in Blank
        </button>
      </div>

      {questions.length > 0 ? (
        renderQuestionEditor()
      ) : (
        <div className="alert alert-info">
          No questions yet. Add your first question using the buttons above.
        </div>
      )}
    </div>
  );
};

export default QuizEditor;