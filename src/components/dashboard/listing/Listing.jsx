import React, { useState } from "react";
import FooterNine from "../../layout/footers/FooterNine";
import Media from "./Media";
import Curriculum from "./Curriculum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function Listing() {
  const [allowFreeSessions, setAllowFreeSessions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [step, setStep] = useState(1); // Start at Step 1

  const nextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white shadow-4 h-100">
              {/* Header */}
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">
                  {step === 1 && "Basic Information"}
                  {step === 2 && "Curriculum"}
                  {step === 3 && "Media"}
                </h2>
              </div>

              {/* Step Content */}
              <div className="py-30 px-30">
                {step === 1 && (
                  <form
                    onSubmit={handleSubmit}
                    className="contact-form row y-gap-30"
                    action="#"
                  >
                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Title*
                      </label>

                      <input
                        required
                        type="text"
                        placeholder="Learn Figma - UI/UX Design Essential Training"
                      />
                    </div>

                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Subtitle
                      </label>

                      <textarea
                        required
                        placeholder="Course Subtitle"
                        rows="7"
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Description*
                      </label>

                      <textarea
                        required
                        placeholder="Description"
                        rows="7"
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        What will students learn in your course?*
                      </label>

                      <textarea
                        required
                        placeholder="Description"
                        rows="7"
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Requirements*
                      </label>

                      <textarea
                        required
                        placeholder="Description"
                        rows="7"
                      ></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Level*
                      </label>
                      <select name="" id="" placeholder="Select course level">
                        <option value="">Beginner level</option>
                        <option value="">Intermediate level</option>
                        <option value="">Expert level </option>
                      </select>

                      {/* <input required type="text" placeholder="Select" /> */}
                    </div>

                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Add Language
                      </label>

                      <input required type="text" placeholder="Language" />
                    </div>
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Language*
                      </label>
                      <select name="" id="" placeholder="Select course level">
                        <option value="">language 1</option>
                        <option value="">language 2</option>
                        <option value="">language 3</option>
                        <option value="">language 4</option>
                      </select>
                      {/* <input required type="text" placeholder="Select" /> */}
                    </div>
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Create Course Category
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Create Course Category"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Category*
                      </label>
                      <select
                        name=""
                        id=""
                        placeholder="Select course category"
                      >
                        <option value="">Course Category 1</option>
                        <option value="">Course Category 2</option>
                        <option value="">Course Category 3</option>
                        <option value="">Course Category 4</option>
                      </select>
                      {/* <input required type="text" placeholder="Select" /> */}
                    </div>
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Create Course subcategory
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Create Course subcategory"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course subcategory*
                      </label>
                      <select
                        name=""
                        id=""
                        placeholder="Select course subcatory"
                      >
                        <option value="">Course subcategory 1</option>
                        <option value="">Course subcategory 2</option>
                        <option value="">Course subcategory 3</option>
                        <option value="">Course subcategory 4</option>
                      </select>
                      {/* <input required type="text" placeholder="Select" /> */}
                    </div>
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Course Durations*
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Course Duration"
                      />
                    </div>
                    <div className="row items-center">
                      <div className="col-md-6 btn-wrapper2 relative !items-end !mt-[30px]">
                        <label className="text-16 lh-1 fw-500 m-0 text-dark-1 mb-10 relative">
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="text-muted me-3"
                          />
                          Attach syllabus or additional documents
                        </label>
                        <input
                          className="upload absolute top-0"
                          required
                          type="file"
                          // placeholder="attachment icon"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="flex gap-2">
                          <div className="flex gap-2 items-center">
                            <input
                              className="upload"
                              required
                              type="checkbox"
                              checked={allowFreeSessions}
                              onChange={(e) =>
                                setAllowFreeSessions(e.target.checked)
                              }
                            />
                            <label className="text-16 lh-1 fw-500 text-dark-1">
                              Allow free Sessions
                            </label>
                          </div>
                          {allowFreeSessions && (
                            <div className="helo">
                              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10"></label>
                              <input
                                required
                                type="text"
                                placeholder="Number of Sessions*"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group form-check flex items-center gap-x-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="ongoingSupport"
                        />
                        <label
                          className="form-check-label !m-0"
                          htmlFor="ongoingSupport"
                        >
                          Enable Ongoing Support After Course Completion
                        </label>
                      </div>
                    </div>
                  </form>
                )}

                {step === 2 && <Curriculum />}
                {step === 3 && <Media />}

                {/* Step Navigation */}
                <div className="row y-gap-20 justify-between pt-15">
                  <div className="col-auto">
                    {step > 1 && (
                      <button
                        onClick={prevStep}
                        type="button"
                        className="button -md -outline-purple-1 text-purple-1"
                      >
                        Prev
                      </button>
                    )}
                  </div>

                  <div className="col-auto">
                    {step < 3 ? (
                      <button
                        onClick={nextStep}
                        type="button"
                        className="button -md -purple-1 text-white"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="button -md -green-1 text-white"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
