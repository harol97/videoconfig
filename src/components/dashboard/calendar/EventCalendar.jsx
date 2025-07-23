import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EventCalendar = ({ view }) => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [calendarApi, setCalendarApi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Define your events array inside the component
  const events = [
    { 
      title: "1 on 1 Sessions", 
      start: new Date(), 
      link: "/courses/1",
      description: "Personalized one-on-one tutoring session",
      instructor: "John Doe",
      duration: "60 mins",
      category: "Tutoring"
    },
    { 
      title: "Classroom Sessions", 
      start: new Date(), 
      link: "/courses/1",
      description: "Group learning session with peers",
      instructor: "Jane Smith",
      duration: "90 mins",
      category: "Group Learning"
    },
  ];

  // Initialize calendar API once
  useEffect(() => {
    if (calendarRef.current && !calendarApi) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, []);

  // Handle view changes
  useEffect(() => {
    if (calendarApi) {
      requestAnimationFrame(() => {
        try {
          calendarApi.changeView(
            view === 'monthly' ? 'dayGridMonth' : 'timeGridWeek'
          );
        } catch (error) {
          console.error("Error changing view:", error);
        }
      });
    }
  }, [view, calendarApi]);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleJoinNow = () => {
    if (selectedEvent) {
      navigate(selectedEvent.extendedProps.link);
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="text-left pt-5 pb-15 px-10" style={{ overflow: "hidden" }}>
        <div className="mt-5">
          <div className="text-14 dot-left ml-5">
            {eventInfo.timeText}
          </div>
          <div className="text-14 text-dark-1 break-content">
            {eventInfo.event.title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div key={view}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={view === 'monthly' ? 'dayGridMonth' : 'timeGridWeek'}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next",
        }}
      />
      
      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p><strong>Time:</strong> {selectedEvent.start?.toLocaleString()}</p>
              <p><strong>Instructor:</strong> {selectedEvent.extendedProps.instructor}</p>
              <p><strong>Duration:</strong> {selectedEvent.extendedProps.duration}</p>
              <p><strong>Category:</strong> {selectedEvent.extendedProps.category}</p>
              <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoinNow}>
            Join Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventCalendar;