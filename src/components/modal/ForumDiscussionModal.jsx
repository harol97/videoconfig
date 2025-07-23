import React, { useState } from "react";
import "./ForumDiscussionModal.css"; // We'll create this CSS file next

const ForumDiscussionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Forum Discussion</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Discussion Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Discussion Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="form-group btn-wrapper2 relative">
            <label className="text-16 lh-1 fw-500 m-0 text-dark-1 mb-10 relative">
              Attach Image
            </label>
            <input
              className="upload absolute top-0"
              required
              type="file"
              placeholder="attachment icon"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="image">Attach Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div> */}

          <div className="modal-footer">
            <button
              type="button"
              className="button h-50 px-30 -purple-1 text-white mt-30"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button h-50 px-30 -purple-1 text-white mt-30"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumDiscussionModal;
