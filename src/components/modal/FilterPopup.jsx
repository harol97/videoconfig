import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const FilterPopup = ({ show, onHide, onApplyFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
    programming: false,
    design: false,
    business: false,
    free: false,
    paid: false,
  });

  const handleFilterChange = (filterName) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: !selectedFilters[filterName],
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      searchTerm,
      ...selectedFilters,
    });
    onHide();
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedFilters({
      beginner: false,
      intermediate: false,
      advanced: false,
      programming: false,
      design: false,
      business: false,
      free: false,
      paid: false,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Search by Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row d-flex items-center gap-20">
          <div className="col-md-5">
            <h2 className="mb-30">Instructor</h2>
            <Form.Group className="mb-20 w-full">
              <Form.Control
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                className="group-modal_input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            <div className="filter-section mt-3">
              <Form.Check
                type="checkbox"
                label="Instructors Name"
                className="mb-2"
              />
            </div>

          </div>
          <div className="col-md-5">
            <h2 className="mb-30">Category</h2>
            <Form.Group className="mb-20 w-full">
              <Form.Control
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                className="group-modal_input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <div className="filter-section mt-3">
              <Form.Check
                type="checkbox"
                label="category"
                className="mb-2"
              />
             
            </div>

          
          </div>
        </div>

      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button variant="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterPopup;
