import FooterNine from "@/components/layout/footers/FooterNine";
import React, { useState } from "react";
import Curriculum from "../listing/Curriculum";
import Media from "../listing/Media";

export default function AssignmentsForms() {
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
    <div className="dashboard__maisn mb-10">
      <div className="">
        <div className="row ">
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
                    {/* Title */}
                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Title
                      </label>
                      <input
                        required
                        type="text"
                        name="title"
                        placeholder="Assignment Title"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Instruction / Description
                      </label>
                      <textarea
                        required
                        name="description"
                        placeholder="Describe the assignment details here..."
                        rows="6"
                      ></textarea>
                    </div>

                    {/* Due Date */}
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Due Date
                      </label>
                      <input
                        required
                        type="date"
                        name="dueDate"
                        className="due-date-input"
                      />
                    </div>

                    {/* Course Selection */}
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Select Course
                      </label>
                      <select name="course" required className="form-select">
                        <option value="">-- Select a course --</option>
                        <option value="course1">Course 1</option>
                        <option value="course2">Course 2</option>
                        <option value="course3">Course 3</option>
                      </select>
                    </div>

                    {/* Enable/Disable User Input */}
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Allow Text Input?
                      </label>
                      <select name="enableText" className="form-select">
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>

                    {/* Enable/Disable Attachment */}
                    <div className="col-md-6">
                      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                        Allow Attachments?
                      </label>
                      <select name="enableAttachment" className="form-select">
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    </div>
                  <div className="col-md-8">
                      <button
                      type="submit"
                      className="button -md -outline-purple-1 text-purple-1"
                    >
                      Submit
                    </button>
                  </div>
                  </form>
                )}

                {step === 2 && <Curriculum />}
                {step === 3 && <Media />}

                {/* Step Navigation */}
                {/* <div className="row y-gap-20 justify-between pt-15">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
