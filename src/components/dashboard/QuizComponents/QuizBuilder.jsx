import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizSidebar from "./QuizSidebar";
import QuizEditor from "./QuizEditor";
import { useNavigate } from "react-router-dom";
import PageLinksTwo from "@/components/common/PageLinksTwo";
import "./quiz-style.css";

const Quiz = () => {
  const [mode, setMode] = useState("take"); // 'take' or 'edit'
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "You are watching the TV news and see this appear on the screen:",
      type: "multiple",
      options: ["A tweet", "A hashtag", "A tag"],
      correctAnswer: 1,
      points: 1.0,
      flagged: false,
    },
    {
      id: 2,
      text: "Complete the sentences:",
      type: "fill",
      parts: [
        "If I want to send short messages of under 140 characters, I use",
        "If I want to quickly share pictures I can use",
        "If I want to do a videochat on my iPhone I can use",
      ],
      correctAnswers: ["SMS", "Instagram", "Facetime"],
      points: 1.0,
      flagged: false,
    },
  ]);

  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completion, setCompletion] = useState(0);

  // ... keep existing functions like handleAnswerChange, toggleFlag, etc.

  const toggleMode = () => {
    setMode(mode === "take" ? "edit" : "take");
    setAnswers({});
    setCompletion(0);
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-12">
            <div className="main__flexxx">
              <div className="first-halff">
                <h1 className="text-30 lh-12 fw-700">Quiz Edit</h1>

                <PageLinksTwo />
              </div>
              <div className="left-side">
                <button
                  className="button -sm -purple-1  text-white"
                  onClick={() => navigate("/dshb-quiz")}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row y-gap-30"
        >
          <div className="col-xl-9">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Quiz</h2>
                <div className="ms-auto">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={toggleMode}
                  >
                    {mode === "take" ? "Edit Quiz" : "Take Quiz"}
                  </button>
                  {mode === "edit" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        // Add your logic to save the quiz
                        alert("Quiz saved successfully!");
                      }}
                    >
                      Save Quiz
                    </button>
                  )}
                </div>
              </div>

              <div className="py-30 px-30">
                {mode === "take" ? (
                  <>
                    {/* Quiz Taking Mode */}
                    <QuizQuestion
                      question={questions[currentQuestionIndex]}
                      questionNumber={currentQuestionIndex + 1}
                      answer={answers[questions[currentQuestionIndex].id] || ""}
                      onAnswerChange={(answer) =>
                        handleAnswerChange(
                          questions[currentQuestionIndex].id,
                          answer
                        )
                      }
                      onFlagToggle={() =>
                        toggleFlag(questions[currentQuestionIndex].id)
                      }
                    />

                    {/* Navigation controls */}
                    <div className="d-flex justify-between items-center mt-40">
                      {/* ... existing navigation buttons */}
                    </div>
                  </>
                ) : (
                  <QuizEditor
                    questions={questions}
                    setQuestions={setQuestions}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3">
            <QuizSidebar
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              completion={completion}
              mode={mode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
