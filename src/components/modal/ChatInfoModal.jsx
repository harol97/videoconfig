import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ChatInfoModal = ({ show, onClose, isGroup, groupMembers = [] }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isGroup ? "Group Info" : "User Info"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isGroup ? (
          <>
            <p>Total Members: {groupMembers.length}</p>
            <ul className="list-unstyled">
              {groupMembers.map((member, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex maan-flex align-items-center">
                    <img
                      src="/assets/img/avatars/small/1.png"
                      className="rounded-circle mr-3"
                      alt="You"
                      width="40"
                      height="40"
                    />
                    <span>{member}</span>
                  </div>
                  <Button
                    className="new_delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />Remove
                  </Button>
                </li>
              ))}
            </ul>
            <div className="text-end glob-pop-delet mt-3">
              <Button
                variant="outline-danger"
                className="new_delete"
                onClick={() => alert("Group deleted")}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete Group
              </Button>
              <Button
                variant="outline-danger"
                className="new_delete"
                onClick={() => alert("Group deleted")}
              >
                <FontAwesomeIcon icon={faTrash} />

                leave Group
              </Button>
            </div>
          </>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Status:</strong> Offline
            </p>
            <p>
              <strong>Email:</strong> johndoe@example.com
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChatInfoModal;
