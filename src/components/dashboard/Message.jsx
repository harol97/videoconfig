import { messageList } from "@/data/dashboard";
import React, { useState, useCallback } from "react";
import FooterNine from "../layout/footers/FooterNine";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faMagnifyingGlass,
  faPaperclip,
  faPenToSquare,
  faPhone,
  faTimes,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import ChatInfoModal from "../modal/ChatInfoModal";
import GroupCreationModal from "../modal/GroupCreationModal";

export default function Message() {
  const [editChat, setEditChat] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [activeChat, setActiveChat] = useState(null);

  // for testing

  const [groupCreationStep, setGroupCreationStep] = useState(0); // 0: not started, 1: select participants, 2: group details
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [disappearingMessages, setDisappearingMessages] = useState("Off");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const navigate = useNavigate();
  const groupMembers = ["Alice", "Bob", "Charlie"]; // Replace with real data

  const handleClick = () => {
    setIsGroup(true); // Set `false` for individual user
    setShowModal(true);
  };

  // Sample contacts data
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "lorem ipsum",
      status: "",
      avatar: "",
    },
    {
      id: "2",
      name: "lorem ipsum",
      status: "Hey there! I am using WhatsApp...",
      avatar: "",
    },
    {
      id: "3",
      name: "lorem ipsum",
      status: "Can't talk. WhatsApp only",
      avatar: "",
    },
    {
      id: "4",
      name: "lorem ipsum",
      status: "Available",
      avatar: "",
    },
    {
      id: "5",
      name: "lorem ipsum",
      status: "Available",
      avatar: "",
    },
  ]);

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper functions
  const handleSelectContact = (contact) => {
    if (!selectedContacts.some((c) => c.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleDeselectContact = (contact) => {
    setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
  };

  const handleCreateGroup = () => {
    // Implement your group creation logic here
    // console.log("Creating group with:", {
    //   name: groupName,
    //   participants: selectedContacts,
    //   disappearingMessages,
    // });

    // // Reset the state
    // setGroupCreationStep(0);
    // setNewChat(false);
    // setSelectedContacts([]);
    // setGroupName("");
    // setDisappearingMessages("Off");
    // setSearchQuery("");

    // // Optionally redirect to the new group chat
    // alert(`Group "${groupName || "Unnamed Group"}" created successfully!`);
    console.log("Creating group:", );
    alert("group is created")

    setShowGroupModal(false);
  };

  // end of testing

  // ✅ Define onDrop FIRST
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Dropped files:", acceptedFiles);
    setUploadedFiles(acceptedFiles);
  }, []);
  const handleRemoveFile = (indexToRemove) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // ✅ THEN use it in useDropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Messages</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-xl-4">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="main_class py-20 px-30 border-bottom-light ">
                <div className="d-flex items-center mb-30 chatss_setting">
                  <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
                  <div className="d-flex align-items-center">
                    {/* for testing */}
                    <div className="chats-options relative">
                      {/* Main button to toggle new chat dropdown */}
                      <button
                        onClick={() => {
                          setNewChat((prev) => !prev);
                          if (!newChat) {
                            setGroupCreationStep(0);
                            setSelectedContacts([]);
                            setGroupName("");
                          }
                        }}
                        className="btn btn-primary"
                        data-el-toggle=".js-more-1-toggle"
                      >
                        <span className="d-flex items-center justify-center size-35 bg-white shadow-1 rounded-8">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                      </button>

                      {/* Dropdown menu for group creation */}
                      <div
                        className={`dropdown-menu ${
                          newChat ? "show" : "d-none"
                        }`}
                        style={{
                          width: "320px",
                          borderRadius: "10px",
                          position: "absolute",
                          zIndex: 1000,
                          backgroundColor: "white",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          padding: "10px",
                        }}
                      >
                        {groupCreationStep === 0 && (
                          <>
                            {/* Search Input */}
                            <div className="mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search name or number"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>

                            {/* New Group Button */}
                            <div
                              className="d-flex align-items-center p-2 rounded hover-bg"
                              style={{ cursor: "pointer" }}
                              // onClick={() => setGroupCreationStep(1)}
                              onClick={() => setShowGroupModal(true)}
                            >
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#00a884",
                                  borderRadius: "50%",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                +
                              </div>
                              <div className="ms-3">New group</div>
                            </div>

                            {/* Message Yourself */}
                            <div
                              className="d-flex align-items-center p-2 rounded hover-bg mt-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => alert("Message yourself")}
                            >
                              <img
                                src="/assets/img/avatars/small/1.png"
                                className="rounded-circle"
                                alt="You"
                                width="40"
                                height="40"
                              />
                              <div className="ms-3">
                                <div>Lorema Ipsum</div>
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "13px" }}
                                >
                                  Message yourself
                                </div>
                              </div>
                            </div>

                            {/* Frequently Contacted Label */}
                            <div
                              className="text-muted mt-3 mb-2 px-1"
                              style={{ fontSize: "12px" }}
                            >
                              Frequently contacted
                            </div>

                            {/* Contact Item */}
                            <div
                              className="d-flex align-items-center p-2 rounded hover-bg"
                              style={{ cursor: "pointer" }}
                              onClick={() => alert("Contact clicked")}
                            >
                              <img
                                src="/assets/img/avatars/small/1.png"
                                className="rounded-circle"
                                alt="Contact"
                                width="40"
                                height="40"
                              />
                              <div className="ms-3">
                                <div>Lorem Ipsum</div>
                              </div>
                            </div>
                          </>
                        )}

                        {groupCreationStep === 1 && (
                          <div>
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                              <button
                                className="btn btn-link text-decoration-none"
                                onClick={() => setGroupCreationStep(0)}
                              >
                                Cancel
                              </button>
                              <h5 className="mb-0">New group</h5>
                              <button
                                className={`btn btn-link text-decoration-none ${
                                  selectedContacts.length === 0
                                    ? "text-muted"
                                    : ""
                                }`}
                                disabled={selectedContacts.length === 0}
                                onClick={() => setGroupCreationStep(2)}
                              >
                                Next
                              </button>
                            </div>

                            <div className="p-2">
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Search contacts"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />

                              <div className="mb-2">
                                {selectedContacts.length > 0 && (
                                  <div className="d-flex flex-wrap mb-2">
                                    {selectedContacts.map((contact) => (
                                      <div
                                        key={contact.id}
                                        className="d-flex align-items-center bg-light rounded-pill p-1 m-1"
                                        style={{ backgroundColor: "#e1f3fb" }}
                                      >
                                        <span className="ms-2">
                                          {contact.name}
                                        </span>
                                        <button
                                          className="btn btn-sm ms-1 p-0"
                                          style={{
                                            border: "none",
                                            background: "transparent",
                                          }}
                                          onClick={() =>
                                            handleDeselectContact(contact)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={faTimes}
                                            size="xs"
                                          />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div
                                className="list-group"
                                style={{
                                  maxHeight: "400px",
                                  overflowY: "auto",
                                }}
                              >
                                {filteredContacts.map((contact) => (
                                  <div
                                    key={contact.id}
                                    className="d-flex align-items-center p-2 hover-bg"
                                    style={{
                                      cursor: "pointer",
                                      backgroundColor: selectedContacts.some(
                                        (c) => c.id === contact.id
                                      )
                                        ? "#f0f8ff"
                                        : "transparent",
                                    }}
                                    onClick={() => {
                                      if (
                                        selectedContacts.some(
                                          (c) => c.id === contact.id
                                        )
                                      ) {
                                        handleDeselectContact(contact);
                                      } else {
                                        handleSelectContact(contact);
                                      }
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input me-2"
                                      checked={selectedContacts.some(
                                        (c) => c.id === contact.id
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          handleSelectContact(contact);
                                        } else {
                                          handleDeselectContact(contact);
                                        }
                                      }}
                                    />
                                    <img
                                      src={
                                        contact.avatar ||
                                        "/assets/img/avatars/small/1.png"
                                      }
                                      className="rounded-circle"
                                      alt={contact.name}
                                      width="40"
                                      height="40"
                                      style={{
                                        borderRadius: "50px",
                                      }}
                                    />
                                    <div className="ms-3">
                                      <div>{contact.name}</div>
                                      <div
                                        className="text-muted"
                                        style={{ fontSize: "13px" }}
                                      >
                                        {contact.status || "Available"}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {groupCreationStep === 2 && (
                          <div>
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                              <button
                                className="btn btn-link text-decoration-none"
                                onClick={() => setGroupCreationStep(1)}
                              >
                                Back
                              </button>
                              <h5 className="mb-0">Group info</h5>
                              <button
                                className="btn btn-link text-decoration-none"
                                onClick={handleCreateGroup}
                              >
                                Create
                              </button>
                            </div>

                            <div className="p-3 text-center">
                              <div className="mb-3">
                                <div className="d-flex justify-content-center">
                                  <div
                                    className="d-flex justify-content-center align-items-center bg-light rounded-circle"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      cursor: "pointer",
                                      backgroundColor: "#f5f5f5",
                                      borderRadius: "50px",
                                    }}
                                    onClick={() =>
                                      alert(
                                        "Group icon upload functionality would go here"
                                      )
                                    }
                                  >
                                    <span>Add group icon</span>
                                  </div>
                                </div>
                                <div className="text-muted small mt-1">
                                  (optional)
                                </div>
                              </div>

                              <div className="mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Group name"
                                  value={groupName}
                                  onChange={(e) => setGroupName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* end of testing */}
                    <div className="chats-options2 relative">
                      <button
                        onClick={() => setEditChat((pre) => !pre)}
                        className=""
                        data-el-toggle=".js-more-1-toggle"
                      >
                        <span className="d-flex items-center justify-center size-35 bg-white shadow-1 rounded-8">
                          <i className="icon-menu-vertical"></i>
                        </span>
                      </button>

                      <div
                        className={`toggle-element -dshb-more js-more-1-toggle ${
                          editChat ? "-is-el-visible" : ""
                        } `}
                      >
                        <div className="px-25 py-25 bg-white -dark-bg-dark-2 shadow-1 border-light rounded-8">
                          <Link
                            to="/dshb-listing"
                            className="d-flex items-center mb-20"
                          >
                            <div className="icon-edit"></div>
                            <div className="text-17 lh-1 fw-500 ml-12">
                              Edit
                            </div>
                          </Link>

                          <a href="#" className="d-flex items-center">
                            <div className="icon-share"></div>
                            <div className="text-17 lh-1 fw-500 ml-12">
                              Share
                            </div>
                          </a>

                          <a href="#" className="d-flex items-center mt-20">
                            <div className="icon-bookmark"></div>
                            <div className="text-17 lh-1 fw-500 ml-12">
                              Favorite
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <form className="search-field border-light rounded-8 h-50">
                    <input
                      required
                      className="bg-white -dark-bg-dark-2 pr-50"
                      type="text"
                      placeholder="Search or Start a new chat"
                    />
                    <button className="" type="submit">
                      <i className="icon-search text-light-1 text-20"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="py-30 px-30">
                <div className="y-gap-30">
                  {messageList.map((elm, i) => (
                    <div
                      key={i}
                      className="d-flex justify-between hover-bg-light p-2 rounded cursor-pointer"
                      style={{
                        backgroundColor:
                          activeChat?.id === elm.id ? "#f0f0f0" : "transparent",
                        borderRadius:
                          activeChat?.id === elm.id ? "20px" : "0px ",
                      }}
                      onClick={() => setActiveChat(elm)}
                    >
                      <div className="d-flex items-center">
                        <div className="shrink-0 chat_img position-relative relative">
                          <img
                            src={elm.avatar}
                            alt="image"
                            className="size-50"
                          />
                          <span
                            className={`status-dot ${
                              elm.isOnline ? "online" : "offline"
                            }`}
                            title={elm.isOnline ? "Online" : "Offline"}
                          ></span>
                        </div>
                        <div className="ml-10">
                          <div className="lh-11 fw-500 text-dark-1">
                            {elm.name}
                          </div>
                          <div className="text-14 lh-11 mt-5">{elm.title}</div>
                        </div>
                      </div>

                      <div className="d-flex items-end flex-column pt-8">
                        <div className="text-13 lh-1"> {elm.time}</div>
                        {elm.group === false && (
                          <div className="text-13 lh-1"> {elm.timezone}</div>
                        )}
                        {elm.notificationCount && (
                          <div className="d-flex justify-center items-center size-20 bg-green-5 rounded-full mt-8">
                            <span className="text-11 lh-1 text-white fw-500">
                              {elm.notificationCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div
              {...getRootProps()}
              className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100 position-relative"
              style={{
                border: isDragActive
                  ? "2px dashed #6f42c1"
                  : "2px solid transparent",
                transition: "border 0.2s ease-in-out",
              }}
            >
              {/* <input {...getInputProps()} /> */}

              {/* Chat Header */}
              <div className="d-flex items-center justify-between py-20 px-30 border-bottom-light">
                <div className="d-flex items-center">
                  <div className="shrink-0">
                    <img
                      onClick={handleClick}
                      src={
                        activeChat?.avatar || "/assets/img/avatars/small/2.png"
                      }
                      alt="image"
                      className="size-50"
                      style={{
                        borderRadius: "50px",
                      }}
                    />
                  </div>
                  <div className="ml-10">
                    <div className="lh-11 fw-500 text-dark-1">
                      {" "}
                      {activeChat?.name || "Select a chat"}
                    </div>
                    <div className="text-14 lh-11 mt-5">
                      {" "}
                      {activeChat?.isOnline ? "Active" : "Offline"}
                    </div>
                  </div>
                </div>

                <div className="main_chat_iconss d-flex align-items-center gap-2">
                  <button type="button" className="btn btn-dark border-0">
                    <FontAwesomeIcon
                      onClick={() => navigate("/video-confrerence")}
                      icon={faVideo}
                    />
                  </button>
                  <button type="button" className="btn btn-dark border-0">
                    <FontAwesomeIcon
                      onClick={() => navigate("/video-confrerence")}
                      icon={faPhone}
                    />
                  </button>

                  {/* Search icon */}
                  <button
                    type="button"
                    className="btn btn-dark border-0 rounded-circle"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark border-0 rounded-circle"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {showSearch && (
                    <input
                      type="text"
                      className="form-control ms-2"
                      style={{ width: "200px" }}
                      placeholder="Type to search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  )}
                </div>
              </div>

              {/* Message Area */}
              <div className="py-40 px-40">
                <div className="row y-gap-20">
                  <div className="col-xl-7 col-lg-10">
                    <div className="d-flex items-center">
                      <div className="shrink-0">
                        <img
                          src="/assets/img/avatars/small/4.png"
                          alt="image"
                          className="size-50"
                          style={{
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <div className="lh-11 fw-500 text-dark-1 ml-10">
                        Albert Flores
                      </div>
                      <div className="text-14 lh-11 ml-10">35 mins</div>
                    </div>
                    <div className="d-inline-block mt-15">
                      <div className="py-20 px-30 bg-light-3 rounded-8">
                        How likely are you to recommend our company to your
                        friends and family?
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-7 offset-xl-5 col-lg-10 offset-lg-2">
                    <div className="d-flex items-center justify-end">
                      <div className="text-14 lh-11 mr-10">35 mins</div>
                      <div className="lh-11 fw-500 text-dark-1 mr-10">You</div>
                      <div className="shrink-0">
                        <img
                          src="/assets/img/avatars/small/3.png"
                          alt="image"
                          className="size-50"
                          style={{
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-inline-block mt-15">
                      <div className="py-20 px-30 bg-light-7 -dark-bg-dark-2 text-purple-1 rounded-8 text-right">
                        Hey there, we’re just writing to let you know that
                        you’ve been subscribed to a repository on GitHub.
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-7 col-lg-10">
                    <div className="d-flex items-center">
                      <div className="shrink-0">
                        <img
                          src="/assets/img/avatars/small/6.png"
                          alt="image"
                          className="size-50"
                          style={{
                            borderRadius: "50px",
                          }}
                        />
                      </div>
                      <div className="lh-11 fw-500 text-dark-1 ml-10">
                        Cameron Williamson
                      </div>
                      <div className="text-14 lh-11 ml-10">35 mins</div>
                    </div>
                    <div className="d-inline-block mt-15">
                      <div className="py-20 px-30 bg-light-3 rounded-8">
                        Ok, Understood!
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input Footer */}

              <div className="py-25 px-40 border-top-light">
                <div className="row y-gap-10 justify-between align-items-center">
                  {/* Input + Attachment */}
                  <div className="col-lg-7">
                    <div className="d-flex align-items-center position-relative">
                      {/* Attachment Button */}
                      <button
                        type="button"
                        className="btn border-0 p-0 me-2"
                        title="Attach File"
                      >
                        <FontAwesomeIcon icon={faPaperclip} size="lg" />
                      </button>

                      {/* Message Input */}
                      <input
                        className="-dark-bg-dark-1 py-20 w-100"
                        type="text"
                        placeholder="Type a Message"
                      />
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="col-auto">
                    <button className="button -md -purple-1 text-white shrink-0">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
              {/* File Preview (Optional) */}
              {uploadedFiles.length > 0 && (
                <div className="px-30 py-2">
                  <h6 className="mb-2">Uploaded Files:</h6>
                  <ul className="list-unstyled mb-0">
                    {uploadedFiles.map((file, idx) => (
                      <li
                        key={idx}
                        className="text-14 text-dark d-flex justify-content-between align-items-center bg-light rounded p-2 mb-1"
                      >
                        <span>📎 {file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="btn btn-sm btn-danger ms-2"
                          style={{
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            padding: "0",
                            fontWeight: "bold",
                            lineHeight: "20px",
                          }}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Drag overlay (optional visual feedback) */}
              {isDragActive && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    zIndex: 999,
                    pointerEvents: "none",
                    borderRadius: "16px",
                  }}
                >
                  <h5 className="text-purple-1">Drop files to upload</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChatInfoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        isGroup={isGroup}
        groupMembers={groupMembers}
      />
      <FooterNine />
    </div>
    {showGroupModal && (
        <GroupCreationModal
          contacts={contacts}
          onClose={() => setShowGroupModal(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </>
  );
}
