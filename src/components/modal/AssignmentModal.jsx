import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./modal.css";

const AssignmentModal = ({ show, onClose }) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const handleSubmit = () => {
    console.log("Text:", text);
    console.log("Files:", files);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="main_modal_class">
        <Form>
          {/* Textarea */}
          <Form.Group controlId="assignmentTextarea" className="mb-3">
            <Form.Label>Write your assignment</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          {/* File Upload */}
          <Form.Group controlId="formFile" className="mb-3 new-class">
            <Form.Label>Attach files</Form.Label>
            <Form.Control type="file" hidden multiple onChange={handleFileChange} />
          </Form.Group>

          {/* Preview Files */}
          {files.length > 0 && (
            <div className="d-flex flex-wrap gap-3">
              {files.map((file, i) => {
                const fileURL = URL.createObjectURL(file);
                if (file.type.startsWith("image")) {
                  return (
                    <img
                      key={i}
                      src={fileURL}
                      alt="preview"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  );
                } else if (file.type.startsWith("video")) {
                  return (
                    <video
                      key={i}
                      src={fileURL}
                      controls
                      style={{ width: 150, height: 100 }}
                    />
                  );
                } else {
                  return (
                    <div key={i}>
                      <a href={fileURL} target="_blank" rel="noreferrer">
                        {file.name}
                      </a>
                    </div>
                  );
                }
              })}
            </div>
          )}
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

export default AssignmentModal;
