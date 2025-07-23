import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./modal.css";

const PolicyCreateModal = ({ show, onClose }) => {
  const [text, setText] = useState("");
  const [textare, setTextare] = useState([]);

  const handleSubmit = () => {
    console.log("Text:", text);
    console.log("Files:", files);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cancellation and Reschedule Policy:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="main_modal_class">
        <Form>
          {/* policy name */}
          <Form.Group controlId="assignmentTextarea" className="mb-3">
            <Form.Label>Polcy Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your policy name..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="new-text-input border-[1px]"
              style={{
                border: "1px solid #DDDDDD"
              }}
            />
          </Form.Group>

          {/* Textarea */}
          <Form.Group controlId="assignmentTextarea" className="mb-3">
            <Form.Label>New policy</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your policy..."
              value={textare}
              onChange={(e) => setTextare(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PolicyCreateModal;
