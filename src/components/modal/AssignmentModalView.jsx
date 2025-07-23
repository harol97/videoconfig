import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./modal.css";

const AssignmentModalView = ({ show, onClose }) => {
  

 

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="main_modal_class">
     <h2 className="mb-4">Assingment</h2>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quibusdam, culpa deserunt eos nihil, minima, magni dolor et quasi quas repellendus ipsum molestiae cumque aspernatur pariatur. Corrupti nostrum non odit?</p>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quibusdam, culpa deserunt eos nihil, minima, magni dolor et quasi quas repellendus ipsum molestiae cumque aspernatur pariatur. Corrupti nostrum non odit?</p>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quibusdam, culpa deserunt eos nihil, minima, magni dolor et quasi quas repellendus ipsum molestiae cumque aspernatur pariatur. Corrupti nostrum non odit?</p>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quibusdam, culpa deserunt eos nihil, minima, magni dolor et quasi quas repellendus ipsum molestiae cumque aspernatur pariatur. Corrupti nostrum non odit?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentModalView;
