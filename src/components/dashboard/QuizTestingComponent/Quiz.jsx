import React, { useState } from "react";
import "./quiz-style.css";
import PageLinksTwo from "@/components/common/PageLinksTwo";

const Quiz = () => {
  // Quiz state
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "mcq", // 'mcq', 'truefalse', 'fillblank'
    text: "",
    options: ["", "", "", ""],
    correctAnswer: null,
    correctAnswers: [""], // For fill-in-the-blank
    points: 1,
  });
  const [errors, setErrors] = useState({
    quizName: false,
    questionText: false,
    options: false,
    correctAnswer: false,
    correctAnswers: false,
  });

  // Validate current question
  const validateQuestion = () => {
    const newErrors = {
      quizName: !quizName.trim(),
      questionText: !currentQuestion.text.trim(),
      options:
        currentQuestion.type === "mcq" &&
        currentQuestion.options.some((opt) => !opt.trim()),
      correctAnswer:
        (currentQuestion.type === "mcq" ||
          currentQuestion.type === "truefalse") &&
        currentQuestion.correctAnswer === null,
      correctAnswers:
        currentQuestion.type === "fillblank" &&
        (currentQuestion.correctAnswers.length === 0 ||
          currentQuestion.correctAnswers.some((a) => !a.trim())),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Add a new question
  const addQuestion = () => {
    if (!validateQuestion()) return;

    setQuestions([...questions, currentQuestion]);
    resetQuestionForm();
  };

  // Reset the question form
  const resetQuestionForm = () => {
    setCurrentQuestion({
      type: "mcq",
      text: "",
      options: ["", "", "", ""],
      correctAnswer: null,
      correctAnswers: [""],
      points: 1,
    });
    setErrors({
      quizName: false,
      questionText: false,
      options: false,
      correctAnswer: false,
      correctAnswers: false,
    });
  };

  // Handle question type change
  const handleTypeChange = (type) => {
    setCurrentQuestion({
      ...currentQuestion,
      type,
      options: type === "mcq" ? ["", "", "", ""] : [],
      correctAnswer: null,
      correctAnswers: type === "fillblank" ? [""] : [],
    });
  };

  // Render question form based on type
  const renderQuestionForm = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <div className="options-section p-20">
            <h4 className="mb-10">Multiple Choice Options</h4>
            {errors.options && (
              <p className="error-message">Please fill all option fields</p>
            )}
            {errors.correctAnswer && (
              <p className="error-message">Please select the correct answer</p>
            )}
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="radio"
                  name="correctOption"
                  checked={currentQuestion.correctAnswer === index}
                  onChange={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: index,
                    })
                  }
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions,
                    });
                  }}
                  placeholder={`Option ${index + 1}`}
                  className={
                    errors.options && !option.trim() ? "error-field" : ""
                  }
                />
                {index >= 2 && (
                  <button
                    onClick={() => {
                      const newOptions = currentQuestion.options.filter(
                        (_, i) => i !== index
                      );
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                        correctAnswer:
                          currentQuestion.correctAnswer === index
                            ? null
                            : currentQuestion.correctAnswer > index
                            ? currentQuestion.correctAnswer - 1
                            : currentQuestion.correctAnswer,
                      });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {currentQuestion.options.length < 6 && (
              <button
                onClick={() => {
                  setCurrentQuestion({
                    ...currentQuestion,
                    options: [...currentQuestion.options, ""],
                  });
                }}
              >
                Add Option
              </button>
            )}
          </div>
        );

      case "truefalse":
        return (
          <div className="options-section">
            <h4>Select Correct Answer</h4>
            {errors.correctAnswer && (
              <p className="error-message">Please select the correct answer</p>
            )}
            <div className="truefalse-options">
              <label>
                <input
                  type="radio"
                  name="truefalse"
                  checked={currentQuestion.correctAnswer === true}
                  onChange={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: true,
                    })
                  }
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="truefalse"
                  checked={currentQuestion.correctAnswer === false}
                  onChange={() =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: false,
                    })
                  }
                />
                False
              </label>
            </div>
          </div>
        );

      case "fillblank":
        return (
          <div className="options-section">
            <h4>Fill in the Blank Answers</h4>
            {errors.correctAnswers && (
              <p className="error-message">Please fill all blank answers</p>
            )}
            {currentQuestion.correctAnswers.map((answer, index) => (
              <div key={index} className="blank-input">
                <span>Blank {index + 1}:</span>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...currentQuestion.correctAnswers];
                    newAnswers[index] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswers: newAnswers,
                    });
                  }}
                  placeholder="Correct answer"
                  className={
                    errors.correctAnswers && !answer.trim() ? "error-field" : ""
                  }
                />
                {index > 0 && (
                  <button
                    onClick={() => {
                      const newAnswers = currentQuestion.correctAnswers.filter(
                        (_, i) => i !== index
                      );
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswers: newAnswers,
                      });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setCurrentQuestion({
                  ...currentQuestion,
                  correctAnswers: [...currentQuestion.correctAnswers, ""],
                });
              }}
            >
              Add Another Blank
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-12">
            <div className="main__flexxx">
              <div className="first-halff">
                <h1 className="text-30 lh-12 fw-700">Quiz</h1>
                <PageLinksTwo />
              </div>
            </div>
          </div>
        </div>
        <div className="quiz-creator">
          <div className="right-component">
            <h2>Create New Quiz</h2>

            <div className="quiz-name">
              <label>Quiz Name:</label>
              <input
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
                className={errors.quizName ? "error-field" : ""}
              />
              {errors.quizName && (
                <p className="error-message">Please enter a quiz name</p>
              )}
            </div>

            <div className="question-type-selector">
              <h3>Question Type:</h3>
              <div className="type-options">
                <button
                  className={currentQuestion.type === "mcq" ? "active" : ""}
                  onClick={() => handleTypeChange("mcq")}
                >
                  Multiple Choice
                </button>
                <button
                  className={
                    currentQuestion.type === "truefalse" ? "active" : ""
                  }
                  onClick={() => handleTypeChange("truefalse")}
                >
                  True/False
                </button>
                <button
                  className={
                    currentQuestion.type === "fillblank" ? "active" : ""
                  }
                  onClick={() => handleTypeChange("fillblank")}
                >
                  Fill in the Blank
                </button>
              </div>
            </div>

            <div className="question-text">
              <label>Question Text:</label>
              <textarea
                value={currentQuestion.text}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    text: e.target.value,
                  })
                }
                placeholder="Enter your question"
                className={errors.questionText ? "error-field" : ""}
              />
              {errors.questionText && (
                <p className="error-message">Please enter the question text</p>
              )}
            </div>

            {renderQuestionForm()}

            <div className="points-input">
              <label>Points:</label>
              <input
                type="number"
                min="1"
                value={currentQuestion.points}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    points: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>

            <button className="add-question-btn" onClick={addQuestion}>
              Add Question
            </button>
          </div>
          <div className="main_left_flex">
            <div className="questions-list">
              <h3 className="mb-5">Questions ({questions.length})</h3>
              {questions?.length === 0 ? (
                <p className="d-flex align-items-center justify-content-center">
                  Kindly add Questions
                </p>
              ) : (
                questions.map((q, index) => (
                  <div key={index} className="question-item">
                    <div className="question-header">
                      <span>
                        Q{index + 1} ({q.type}) - {q.points}pt
                      </span>
                      <button
                        onClick={() => {
                          setQuestions(questions.filter((_, i) => i !== index));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <p>{q.text}</p>
                    {q.type === "mcq" && (
                      <ul>
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={q.correctAnswer === i ? "correct" : ""}
                          >
                            {opt} {q.correctAnswer === i && "(Correct)"}
                          </li>
                        ))}
                      </ul>
                    )}
                    {q.type === "truefalse" && (
                      <p>
                        Correct Answer: {q.correctAnswer ? "True" : "False"}
                      </p>
                    )}
                    {q.type === "fillblank" && (
                      <div>
                        <p>Correct Answers:</p>
                        <ul>
                          {q.correctAnswers.map((ans, i) => (
                            <li key={i}>{ans}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {questions.length > 0 && (
              <div className="d-flex justify-content-center mt-10">
                <button className="save-quiz-btn mr-2">Save Quiz</button>
                <button className="save-quiz-btn">Save Draft</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
