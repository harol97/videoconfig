import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const GroupCreationModal = ({ contacts, onClose, onCreateGroup }) => {
  const [groupCreationStep, setGroupCreationStep] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const modalRef = useRef();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectContact = (contact) => {
    if (!selectedContacts.some(c => c.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleDeselectContact = (contact) => {
    setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id));
  };

  const handleCreateGroup = () => {
    onCreateGroup({
      name: groupName,
      members: selectedContacts,
    });
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 1050
    }}>
      <div 
        ref={modalRef}
        className="modal-dialog" 
        style={{ 
          width: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}
      >
        {/* Header with close button */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <button
            className="btn btn-link text-decoration-none p-0"
            onClick={onClose}
            style={{ width: "24px", height: "24px" }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h5 className="mb-0">
            {groupCreationStep === 1 ? "Add group participants" : "Group info"}
          </h5>
          <div style={{ width: "24px" }}></div> {/* Spacer for alignment */}
        </div>

        {/* Modal body */}
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {groupCreationStep === 1 ? (
            <Step1Contacts 
              selectedContacts={selectedContacts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredContacts={filteredContacts}
              handleSelectContact={handleSelectContact}
              handleDeselectContact={handleDeselectContact}
            />
          ) : (
            <Step2GroupInfo 
              groupName={groupName}
              setGroupName={setGroupName}
            />
          )}
        </div>

        {/* Footer with navigation buttons */}
        <div className="d-flex justify-content-between p-3 border-top">
          {groupCreationStep === 2 ? (
            <button
              className="btn btn-light button -sm -purple-1 text-white shrink-0 "
              onClick={() => setGroupCreationStep(1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2 text-white" />
              Back
            </button>
          ) : (
            <div></div> 
          )}
          
          {groupCreationStep === 1 ? (
            <button
              className={`button -sm -purple-1 text-white shrink-0 ${selectedContacts.length === 0 ? "disabled" : ""}`}
              disabled={selectedContacts.length === 0}
              onClick={() => setGroupCreationStep(2)}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-primary button -sm -purple-1 text-white shrink-0"
              onClick={handleCreateGroup}
              disabled={!groupName.trim()}
            >
              Create Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Step1Contacts = ({ 
  selectedContacts, 
  searchQuery, 
  setSearchQuery, 
  filteredContacts, 
  handleSelectContact, 
  handleDeselectContact 
}) => (
  <div className="p-3">
    <input
      type="text"
      className="form-control mb-3 group-modal_input"
      placeholder="Search contacts"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    {selectedContacts.length > 0 && (
      <div className="d-flex flex-wrap mb-3">
        {selectedContacts.map((contact) => (
          <div
            key={contact.id}
            className="d-flex align-items-center bg-light rounded-pill p-1 m-1"
            style={{ backgroundColor: "#e1f3fb" }}
          >
            <span className="ms-2">{contact.name}</span>
            <button
              className="btn btn-sm ms-1 p-0"
              style={{ border: "none", background: "transparent" }}
              onClick={() => handleDeselectContact(contact)}
            >
              <FontAwesomeIcon icon={faTimes} size="xs" />
            </button>
          </div>
        ))}
      </div>
    )}

    <div className="list-group">
      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          className="d-flex align-items-center p-2 hover-bg"
          style={{
            cursor: "pointer",
            backgroundColor: selectedContacts.some(c => c.id === contact.id)
              ? "#f0f8ff"
              : "transparent",
          }}
          onClick={() => {
            if (selectedContacts.some(c => c.id === contact.id)) {
              handleDeselectContact(contact);
            } else {
              handleSelectContact(contact);
            }
          }}
        >
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={selectedContacts.some(c => c.id === contact.id)}
            onChange={(e) => {
              if (e.target.checked) {
                handleSelectContact(contact);
              } else {
                handleDeselectContact(contact);
              }
            }}
          />
          <img
            src={contact.avatar || "/assets/img/avatars/small/1.png"}
            className="rounded-circle"
            alt={contact.name}
            width="40"
            height="40"
          />
          <div className="ms-3">
            <div>{contact.name}</div>
            <div className="text-muted small">
              {contact.status || "Available"}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Step2GroupInfo = ({ groupName, setGroupName }) => (
  <div className="p-4 text-center">
    <div className="mb-4">
      <div className="d-flex justify-content-center mb-2">
        <div
          className="d-flex justify-content-center align-items-center bg-light rounded-circle"
          style={{
            width: "100px",
            height: "100px",
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
          }}
          onClick={() => alert("Group icon upload functionality would go here")}
        >
          <span>Add group icon</span>
        </div>
      </div>
      <div className="text-muted small">(optional)</div>
    </div>

    <div className="mb-3">
      <input
        type="text"
        className="form-control group-modal_input"
        placeholder="Group name"
        required
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        style={{ textAlign: "center" }}
      />
    </div>
  </div>
);

export default GroupCreationModal;