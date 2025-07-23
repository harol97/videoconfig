import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    title: "",
    message: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.title && form.message) {
      onSubmit({
        ...form,
        date: "Just now",
      });
      setForm({
        name: "",
        rating: 5,
        title: "",
        message: "",
      });
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="p-4 rounded-[30px] bg-white shadow-sm mb-4">
          <h5 className="mb-3">Leave a Review</h5>
          <form className="mt-40" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Your name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="form-control due-date-input"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Rating */}
            <div className="mb-3 d-flex align-items-center main_classs">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Rating
              </label>
              <div className="d-flex align-items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <span
                      key={i}
                      className={`fs-5 me-2 ${
                        starValue <= (hoverRating || form.rating)
                          ? "text-warning"
                          : "text-secondary"
                      }`}
                      style={{ cursor: "pointer", fontSize: "24px" }}
                      onClick={() => handleRatingChange(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      &#9733;
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="mb-3">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Review title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Review title"
                className="form-control due-date-input"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                Write your review...
              </label>
              <textarea
                name="message"
                placeholder="Write your review..."
                className="form-control due-date-input"
                rows="4"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <button
              className="button -md -outline-purple-1 text-purple-1"
              type="submit"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
