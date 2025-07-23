import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Curriculum() {
  // Sample assignments and quizzes data
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", selected: false },
    { id: 2, title: "Assignment 2", selected: false },
  ]);

  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Quiz 1", selected: false },
    { id: 2, title: "Quiz 2", selected: false },
  ]);

  // Main state for accordions
  const [accordions, setAccordions] = useState([]);
  const [newAccordionTitle, setNewAccordionTitle] = useState("");
  const [currentOpenItem, setCurrentOpenItem] = useState("");
  const [showLecture, setShowLecture] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);


  // Add new accordion section
  const addNewAccordion = () => {
    if (!newAccordionTitle.trim()) return;

    const newAccordion = {
      id: Date.now(),
      title: newAccordionTitle,
      isEditing: false,
      lecture: { text: "", attachment: null },
      selectedAssignments: [],
      selectedQuizzes: [],
      searchAssignment: "",
      searchQuiz: "",
      showAssignmentSelection: false,
      showQuizSelection: false
    };

    setAccordions([...accordions, newAccordion]);
    setNewAccordionTitle("");
    setShowLecture(false);
    setShowAssignment(false);
    setShowQuiz(false);
  };

  // Update accordion title
  const updateAccordionTitle = (id, newTitle) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id ? { ...acc, title: newTitle } : acc
      )
    );
  };

  // Toggle edit mode for accordion title
  const toggleEdit = (id) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id ? { ...acc, isEditing: !acc.isEditing } : acc
      )
    );
  };

  // Delete an accordion
  const deleteAccordion = (id) => {
    setAccordions(accordions.filter((acc) => acc.id !== id));
  };

  // Handle file upload for lecture
  const handleFileUpload = (e, id) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              lecture: { ...acc.lecture, attachment: e.target.files[0] },
            }
          : acc
      )
    );
  };

  // Toggle assignment selection
  const toggleAssignmentSelection = (accordionId, assignmentId) => {
    setAccordions(
      accordions.map((acc) => {
        if (acc.id !== accordionId) return acc;

        const isSelected = acc.selectedAssignments.includes(assignmentId);
        return {
          ...acc,
          selectedAssignments: isSelected
            ? acc.selectedAssignments.filter((id) => id !== assignmentId)
            : [...acc.selectedAssignments, assignmentId],
        };
      })
    );
  };

  // Toggle quiz selection
  const toggleQuizSelection = (accordionId, quizId) => {
    setAccordions(
      accordions.map((acc) => {
        if (acc.id !== accordionId) return acc;

        const isSelected = acc.selectedQuizzes.includes(quizId);
        return {
          ...acc,
          selectedQuizzes: isSelected
            ? acc.selectedQuizzes.filter((id) => id !== quizId)
            : [...acc.selectedQuizzes, quizId],
        };
      })
    );
  };

  // Update search terms
  const updateAccordionSearch = (id, type, value) => {
    setAccordions(
      accordions.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              [type === "assignment" ? "searchAssignment" : "searchQuiz"]:
                value,
            }
          : acc
      )
    );
  };

  // Filter assignments based on search term
  const filteredAssignments = (searchTerm) =>
    assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Filter quizzes based on search term
  const filteredQuizzes = (searchTerm) =>
    quizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Toggle accordion open/close
  const toggleAccordion = (id) => {
    setCurrentOpenItem(currentOpenItem === id ? "" : id);
    setShowLecture(false);
    setShowAssignment(false);
    setShowQuiz(false);
  };

  // Add new assignment
  const addNewAssignment = (accordionId) => {
    setAccordions(
      accordions.map((acc) => 
        acc.id === accordionId 
          ? { ...acc, showAssignmentSelection: !acc.showAssignmentSelection } 
          : acc
      )
    );
  };

  // Add new quiz
  const addNewQuiz = (accordionId) => {
    setAccordions(
      accordions.map((acc) => 
        acc.id === accordionId 
          ? { ...acc, showQuizSelection: !acc.showQuizSelection } 
          : acc
      )
    );
  };

  // Create new assignment
  const createNewAssignment = () => {
    const newAssignment = {
      id: Date.now(),
      title: `Assignment ${assignments.length + 1}`,
      selected: false,
    };
    setAssignments([...assignments, newAssignment]);
  };

  // Create new quiz
  const createNewQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      title: `Quiz ${quizzes.length + 1}`,
      selected: false,
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  return (
    <div className="py-30 px-30">
      <div className="flex items-center justify-between mb-30">
        <h2>Content</h2>
        <div className="d-flex items-center">
          <input
            type="text"
            className="mr-20 group-modal_input"
            placeholder="Enter section title"
            value={newAccordionTitle}
            onChange={(e) => setNewAccordionTitle(e.target.value)}
          />
          <button
            className="button -md -purple-1 text-white"
            onClick={addNewAccordion}
          >
            Add Content
          </button>
        </div>
      </div>

      {/* Dynamic accordions */}
      {accordions.map((accordion) => (
        <div key={accordion.id} className="row pt-30">
          <div className="col-12">
            <div className="accordion -block-2 text-left js-accordion">
              <div
                className={`accordion__item -dark-bg-dark-1 mt-10 ${
                  currentOpenItem === accordion.id ? "is-active" : ""
                }`}
              >
                <div
                  className="accordion__button py-20 px-30 bg-light-4"
                  onClick={() => toggleAccordion(accordion.id)}
                >
                  <div className="d-flex items-center">
                    {accordion.isEditing ? (
                      <input
                        type="text"
                        value={accordion.title}
                        onChange={(e) =>
                          updateAccordionTitle(accordion.id, e.target.value)
                        }
                        className="mr-10 text-16 fw-500 group-modal_input"
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    ) : (
                      <span className="text-16 lh-14 fw-500 text-dark-1">
                        {accordion.title}
                      </span>
                    )}
                  </div>

                  <div className="d-flex x-gap-10 items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEdit(accordion.id);
                      }}
                      className="icon icon-edit mr-5"
                    ></button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAccordion(accordion.id);
                      }}
                      className="icon icon-bin"
                    ></button>
                    <div className="accordion__icon mr-0">
                      <div className="icon icon-chevron-down"></div>
                      <div className="icon icon-chevron-up"></div>
                    </div>
                  </div>
                </div>

                <div
                  className="accordion__content"
                  style={{
                    maxHeight: currentOpenItem === accordion.id ? "100%" : "0",
                  }}
                >
                  <div className="accordion__content__inner px-30 py-30">
                    {/* Action buttons */}
                    <div className="flex gap-2 mb-30">
                      <button
                        className={`button -sm -purple-1 text-white shrink-0 ${
                          showLecture ? "active" : ""
                        }`}
                        onClick={() => setShowLecture(!showLecture)}
                      >
                        {showLecture ? "Hide Lecture" : "Add Lecture"}
                      </button>
                      <button
                        className={`button -sm -purple-1 text-white shrink-0 ${
                          showAssignment ? "active" : ""
                        }`}
                        onClick={() => {
                          setShowAssignment(!showAssignment);
                          if (showAssignment) {
                            setAccordions(
                              accordions.map(acc => 
                                acc.id === accordion.id 
                                  ? { ...acc, showAssignmentSelection: false } 
                                  : acc
                              )
                            );
                          }
                        }}
                      >
                        {showAssignment ? "Hide Assignment" : "Add Assignment"}
                      </button>
                      <button
                        className={`button -sm -purple-1 text-white shrink-0 ${
                          showQuiz ? "active" : ""
                        }`}
                        onClick={() => {
                          setShowQuiz(!showQuiz);
                          if (showQuiz) {
                            setAccordions(
                              accordions.map(acc => 
                                acc.id === accordion.id 
                                  ? { ...acc, showQuizSelection: false } 
                                  : acc
                              )
                            );
                          }
                        }}
                      >
                        {showQuiz ? "Hide Quiz" : "Add Quiz"}
                      </button>
                    </div>

                    {/* Lecture Section */}
                    {showLecture && (
                      <div className="mb-10">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Enter lecture content"
                            value={accordion.lecture.text}
                            onChange={(e) =>
                              setAccordions(
                                accordions.map((acc) =>
                                  acc.id === accordion.id
                                    ? {
                                        ...acc,
                                        lecture: {
                                          ...acc.lecture,
                                          text: e.target.value,
                                        },
                                      }
                                    : acc
                                )
                              )
                            }
                          ></textarea>
                        </div>
                        <div className="btn-wrapper2 w-[50%] pl-30 relative !items-end !mt-[30px]">
                          <label className="text-16 lh-1 fw-500 m-0 text-dark-1 mb-10 relative">
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="text-muted me-3"
                            />
                            Attach Lectures or additional documents
                          </label>
                          <input
                            className="upload absolute top-0"
                            required
                            type="file"
                            onChange={(e) => handleFileUpload(e, accordion.id)}
                          />
                          {accordion.lecture.attachment && (
                            <div className="text-14 mt-10">
                              Selected: {accordion.lecture.attachment.name}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Assignment Section */}
                    {showAssignment && (
                      <div className="mb-30">
                        {accordion.showAssignmentSelection ? (
                          <div>
                            <h4 className="text-16 fw-500 mb-20">Selected Assignments:</h4>
                            {accordion.selectedAssignments.length > 0 ? (
                              <div className="bg-white rounded-8 pl-20">
                                {accordion.selectedAssignments.map(assignmentId => {
                                  const assignment = assignments.find(a => a.id === assignmentId);
                                  return assignment ? (
                                    <div key={assignment.id} className="d-flex items-center py-10 border-bottom-1">
                                      <span className="text-14">{assignment.title}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <div className="text-14 text-light-1 py-20 text-center">
                                No assignments selected
                              </div>
                            )}
                            <button
                              className="button -md -purple-1 text-white mt-20 ml-auto"
                              onClick={() => addNewAssignment(accordion.id)}
                            >
                              {accordion.selectedAssignments.length > 0 ? 'Edit Selection' : 'Select Assignments'}
                            </button>
                          </div>
                        ): (
                          <>
                            <div className="d-flex justify-between items-center mb-20">
                              <div
                                className="form-group"
                                style={{ flex: 1, marginRight: "20px" }}
                              >
                                <input
                                  type="text"
                                  className="form-control group-modal_input"
                                  placeholder="Search assignments..."
                                  value={accordion.searchAssignment}
                                  onChange={(e) =>
                                    updateAccordionSearch(
                                      accordion.id,
                                      "assignment",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {/* <button
                                className="button -md -purple-1 text-white"
                                onClick={() => createNewAssignment()}
                              >
                                Create New
                              </button> */}
                            </div>

                            <div className="bg-white rounded-8 pl-20">
                              {filteredAssignments(accordion.searchAssignment)
                                .length > 0 ? (
                                filteredAssignments(accordion.searchAssignment).map(
                                  (assignment) => (
                                    <div
                                      key={assignment.id}
                                      className="d-flex items-center py-10 border-bottom-1"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={accordion.selectedAssignments.includes(
                                          assignment.id
                                        )}
                                        onChange={() =>
                                          toggleAssignmentSelection(
                                            accordion.id,
                                            assignment.id
                                          )
                                        }
                                        className="mr-10"
                                      />
                                      <span className="text-14">
                                        {assignment.title}
                                      </span>
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="text-14 text-light-1 py-20 text-center">
                                  No assignments found
                                </div>
                              )}
                            </div>

                            <button
                              className="button -md -purple-1 text-white mt-20 ml-auto"
                              onClick={() => addNewAssignment(accordion.id)}
                            >
                              Done Selecting
                            </button>
                          </>
                        ) }
                      </div>
                    )}

                    {/* Quiz Section */}
                    {showQuiz && (
                      <div className="mb-30">
                        {accordion.showQuizSelection ? (
                          <div>
                            <h4 className="text-16 fw-500 mb-20">Selected Quizzes:</h4>
                            {accordion.selectedQuizzes.length > 0 ? (
                              <div className="bg-white rounded-8 pl-20">
                                {accordion.selectedQuizzes.map(quizId => {
                                  const quiz = quizzes.find(q => q.id === quizId);
                                  return quiz ? (
                                    <div key={quiz.id} className="d-flex items-center py-10 border-bottom-1">
                                      <span className="text-14">{quiz.title}</span>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <div className="text-14 text-light-1 py-20 text-center">
                                No quizzes selected
                              </div>
                            )}
                            <button
                              className="button -md -purple-1 text-white mt-20 ml-auto"
                              onClick={() => addNewQuiz(accordion.id)}
                            >
                              {accordion.selectedQuizzes.length > 0 ? 'Edit Selection' : 'Select Quizzes'}
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="d-flex justify-between items-center mb-20">
                              <div
                                className="form-group"
                                style={{ flex: 1, marginRight: "20px" }}
                              >
                                <input
                                  type="text"
                                  className="form-control group-modal_input"
                                  placeholder="Search quizzes..."
                                  value={accordion.searchQuiz}
                                  onChange={(e) =>
                                    updateAccordionSearch(
                                      accordion.id,
                                      "quiz",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {/* <button
                                className="button -md -purple-1 text-white"
                                onClick={() => createNewQuiz()}
                              >
                                Create New
                              </button> */}
                            </div>

                            <div className="bg-white rounded-8 pl-20">
                              {filteredQuizzes(accordion.searchQuiz).length > 0 ? (
                                filteredQuizzes(accordion.searchQuiz).map(
                                  (quiz) => (
                                    <div
                                      key={quiz.id}
                                      className="d-flex items-center py-10 border-bottom-1"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={accordion.selectedQuizzes.includes(
                                          quiz.id
                                        )}
                                        onChange={() =>
                                          toggleQuizSelection(
                                            accordion.id,
                                            quiz.id
                                          )
                                        }
                                        className="mr-10"
                                      />
                                      <span className="text-14">{quiz.title}</span>
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="text-14 text-light-1 py-20 text-center">
                                  No quizzes found
                                </div>
                              )}
                            </div>

                            <button
                              className="button -md -purple-1 text-white mt-20 ml-auto"
                              onClick={() => addNewQuiz(accordion.id)}
                            >
                              Done Selecting
                            </button>
                          </>
                        ) }
                      </div>
                    )}

                    {/* Save Button */}
                    {(showLecture || showAssignment || showQuiz) && (
                      <button className="button -md -purple-1 text-white mt-20" 
                      onClick={()=> setCurrentOpenItem(false)}
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}