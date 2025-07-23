import React, { useState } from "react";
import {
  X,
  Monitor,
  MousePointer,
  Shield,
  Clock,
  Check,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Tooltip } from "./Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const RemoteControlPanel = ({
  isOpen,
  onClose,
  participants,
  currentUser,
  pendingRequests,
  onRequestControl,
  onApproveControl,
  onDenyControl,
  onStopControl,
}) => {
  const [selectedParticipant, setSelectedParticipant] = useState("");

  const availableParticipants = participants.filter(
    (p) =>
      p.id !== currentUser.id && p.isScreenSharing && !p.isControllingScreen
  );

  const controllingParticipant = participants.find(
    (p) => p.isControllingScreen
  );
  const allowingControlParticipant = participants.find(
    (p) => p.isAllowingControl
  );

  const handleRequestControl = () => {
    if (selectedParticipant) {
      onRequestControl(selectedParticipant);
      setSelectedParticipant("");
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block bg-gray-600 bg-opacity-50"
      tabIndex="-1"
      style={{ zIndex: 1050 }}
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark border border-secondary !max-w-[38rem] !bg-[#111827]">
          {/* Header */}
          <div className="flex justify-between items-center modal-header border-bottom border-secondary">
            <div className="d-flex align-items-center justify-between gap-2">
              <Tooltip
                content="Remote Control"
                hint="Manage screen control sessions"
              >
                <MousePointer className="text-primary" size={20} />
              </Tooltip>
              <h2 className="modal-title text-white">Remote Control</h2>
            </div>
            <Tooltip content="Close" hint="Close remote control panel">
              <button onClick={onClose} className="btn-close btn-close-white">
                <FontAwesomeIcon className="h-12 w-12" icon={faX} />
              </button>
            </Tooltip>
          </div>

          <div
            className="modal-body overflow-auto"
            style={{ maxHeight: "60vh" }}
          >
            {/* Current Control Status */}
            {(controllingParticipant || allowingControlParticipant) && (
              <div className="bg-primary bg-opacity-10 border border-primary rounded p-4 mb-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Tooltip
                    content="Active session"
                    hint="Remote control is currently active"
                  >
                    <Shield className="text-primary" size={20} />
                  </Tooltip>
                  <h3 className="text-primary fw-medium m-0">
                    Active Control Session
                  </h3>
                </div>

                {currentUser.isControllingScreen && (
                  <div className="d-flex flex-column gap-3">
                    <p className="text-white small m-0">
                      You are controlling{" "}
                      <span className="fw-bold">
                        {allowingControlParticipant?.name}
                      </span>
                      's screen
                    </p>
                    <Tooltip
                      content="Stop controlling"
                      hint="End the remote control session"
                    >
                      <button
                        onClick={onStopControl}
                        className="btn btn-danger w-100"
                      >
                        Stop Controlling
                      </button>
                    </Tooltip>
                  </div>
                )}

                {currentUser.isAllowingControl && (
                  <div className="d-flex flex-column gap-3">
                    <p className="text-white small m-0">
                      <span className="fw-bold">
                        {controllingParticipant?.name}
                      </span>{" "}
                      is controlling your screen
                    </p>
                    <Tooltip
                      content="Revoke control"
                      hint="Stop allowing remote control"
                    >
                      <button
                        onClick={onStopControl}
                        className="btn btn-danger w-100"
                      >
                        Revoke Control
                      </button>
                    </Tooltip>
                  </div>
                )}

                {!currentUser.isControllingScreen &&
                  !currentUser.isAllowingControl && (
                    <p className="text-light small m-0">
                      <span className="fw-bold">
                        {controllingParticipant?.name}
                      </span>{" "}
                      is controlling{" "}
                      <span className="fw-bold">
                        {allowingControlParticipant?.name}
                      </span>
                      's screen
                    </p>
                  )}
              </div>
            )}

            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="mb-4">
                <h3 className="text-white fw-medium d-flex align-items-center gap-2 mb-3">
                  <Tooltip
                    content="Pending requests"
                    hint="Control requests awaiting response"
                  >
                    <Clock className="text-warning" size={16} />
                  </Tooltip>
                  <span className="m-0">Pending Requests</span>
                </h3>

                {pendingRequests.map((request) => (
                  <div key={request.id} className="card bg-secondary mb-3">
                    <div className="card-body">
                      {request.targetId === currentUser.id ? (
                        // Incoming request
                        <div className="d-flex flex-column gap-3">
                          <div className="d-flex align-items-center gap-2">
                            <Tooltip
                              content="Incoming request"
                              hint="Someone wants to control your screen"
                            >
                              <AlertTriangle
                                className="text-warning"
                                size={16}
                              />
                            </Tooltip>
                            <p className="text-white small m-0">
                              <span className="fw-bold">
                                {request.requesterName}
                              </span>{" "}
                              wants to control your screen
                            </p>
                          </div>
                          <p className="text-muted small m-0">
                            Requested at {formatTime(request.timestamp)}
                          </p>
                          <div className="d-flex gap-2">
                            <Tooltip
                              content="Allow control"
                              hint="Grant remote control access"
                            >
                              <button
                                onClick={() => onApproveControl(request.id)}
                                className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                              >
                                <Check size={16} />
                                <span>Allow</span>
                              </button>
                            </Tooltip>
                            <Tooltip
                              content="Deny control"
                              hint="Reject remote control request"
                            >
                              <button
                                onClick={() => onDenyControl(request.id)}
                                className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                              >
                                <XCircle size={16} />
                                <span>Deny</span>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      ) : (
                        // Outgoing request
                        <div className="d-flex flex-column gap-2">
                          <p className="text-white small m-0">
                            Waiting for{" "}
                            <span className="fw-bold">
                              {request.targetName}
                            </span>{" "}
                            to respond
                          </p>
                          <p className="text-muted small m-0">
                            Requested at {formatTime(request.timestamp)}
                          </p>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle bg-warning"
                              style={{ width: "8px", height: "8px" }}
                            />
                            <span className="text-warning small">
                              Pending approval
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Request Control */}
            {!currentUser.isControllingScreen &&
              !currentUser.isAllowingControl && (
                <div className="mb-4">
                  <h3 className="text-white fw-medium mb-3">
                    Request Screen Control
                  </h3>

                  {availableParticipants.length === 0 ? (
                    <div className="card bg-[#1f2937]  pt-3 pb-2 rounded-xl text-center">
                      <div className="card-body flex justify-center flex-col items-center">
                        <Monitor className="text-muted mb-2" size={32} />
                        <p className="text-muted small m-0">
                          No participants are currently sharing their screen
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      <p className="text-light small m-0">
                        Select a participant whose screen you want to control:
                      </p>

                      <select
                        value={selectedParticipant}
                        onChange={(e) => setSelectedParticipant(e.target.value)}
                        className="form-select bg-dark text-white border-secondary"
                      >
                        <option value="">Select a participant...</option>
                        {availableParticipants.map((participant) => (
                          <option key={participant.id} value={participant.id}>
                            {participant.name} (Presenting)
                          </option>
                        ))}
                      </select>

                      <Tooltip
                        content="Request control"
                        hint="Send a control request to the selected participant"
                      >
                        <button
                          onClick={handleRequestControl}
                          disabled={!selectedParticipant}
                          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                          <MousePointer size={16} />
                          <span>Request Control</span>
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              )}

            {/* Information */}
            <div className="card bg-[#1f2937]  p-3 rounded-md">
              <div className="card-body">
                <h4 className="text-white small fw-bold mb-2">How it works:</h4>
                <ul className="text-muted text-white small mb-0">
                  <li>
                    • Only participants sharing their screen can grant control
                  </li>
                  <li>• Control requests require explicit approval</li>
                  <li>
                    • Either party can end the control session at any time
                  </li>
                  <li>• Only one control session can be active at a time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top border-secondary">
            <button onClick={onClose} className="btn btn-secondary mt-3">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
