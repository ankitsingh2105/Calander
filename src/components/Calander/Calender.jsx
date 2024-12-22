import React, { useState, useEffect } from "react";
import "./Calendar.css";
import EventOfDays from "../EventsOfDay/EventsOfDay";
import EventForm from "../EventForm/EventForm";
import FilterPanel from "../FilterPanel/FilterPanel";
import eventTypes from "../eventTypes";
import Header from "../Header/Header";

const Calendar = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDate, setCurrentDate] = useState(new Date());

  // todo :: getting data from localstorage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const [eventType, seteventType] = useState("")
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalView, setViewModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: "", startTime: "", endTime: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);


  // todo :: for filtering based on keywords
  const [filterKeyword, setFilterKeyword] = useState("");


  // todo :: helper functions from calander logic
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}`);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };


  // todo :: move to prev or next month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // todo :: event handling
  const handleDayClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    setViewModal(true);
  };

  // todo :: editing the event
  const handleEdit = (index) => {
    const dateKey = selectedDate.toDateString();
    const eventToEdit = events[dateKey][index];
    setNewEvent({ ...eventToEdit });
    setEditIndex(index);
    setViewModal(true);
  };


  // todo :: saving the event
  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.startTime || !newEvent.endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const startTime = formatTime(newEvent.startTime);
    const endTime = formatTime(newEvent.endTime);
    const dateKey = selectedDate.toDateString();

    const updatedEvents = { ...events };

    if (editIndex !== null) {
      updatedEvents[dateKey][editIndex] = {
        ...newEvent,
        startTime,
        endTime,
        eventType
      };
    } else {

      updatedEvents[dateKey] = [
        ...(updatedEvents[dateKey] || []),
        { ...newEvent, startTime, endTime, eventType },
      ];
    }

    setEvents(updatedEvents);
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
    setEditIndex(null);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };


  // todo :: delete the element
  const handleDeleteEvent = (eventIndex) => {
    const dateKey = selectedDate.toDateString();
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter((_, index) => index !== eventIndex),
    };

    if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];

    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
  };


  // todo :: close the modal
  const closeModal = () => {
    setViewModal(false);
    setSelectedDate(null);
    setEditIndex(null);
  };

  // todo :: filter the events based on the keyword
  const filteredEvents = (dateKey) => {
    if (!filterKeyword) return events[dateKey] || [];
    return (events[dateKey] || []).filter(
      (event) =>
        event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(filterKeyword.toLowerCase()))
    );
  };
 

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    console.log(currentDate.getMonth() ," shit ", new Date().getMonth());
    const startDay = firstDayOfMonth(year, month);
    const today = (new Date());
    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="day empty-day"></div>);
    }

    for (let day = 1; day <= days; day++) {
      const dateKey = new Date(year, month, day).toDateString();
      daysArray.push(
        <div key={day} style={(day == today.getDate() && currentDate.getMonth() == today.getMonth()) ? { background: "#52fe52" } : {}} className="day" onClick={() => handleDayClick(day)}>
          {day}
          {events[dateKey] && (
            <div className="event-list">
              {events[dateKey].map((event, index) => (
                <div key={index} className="event">
                  {event.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return daysArray;
  };


  return (
    <div className="calendar-container">

      <div className="calendar">


        {/* header */}
        <Header currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth} />

        {/* Search bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search events..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />

        {/* getting days of the week */}
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-label">
              {day}
            </div>
          ))}
        </div>

        {/* rendering all dates */}

        <div className="calendar-grid">{renderDays()}</div>

        {/* adding an event */}
        {modalView && selectedDate && (
          <div className="event-modal">
            <EventForm
              eventTypes={eventTypes}
              selectedDate={selectedDate}
              handleSaveEvent={handleSaveEvent}
              closeModal={closeModal}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              seteventType={seteventType}
              editIndex={editIndex}
            />

            {/* all event appear here */}
            <EventOfDays
              selectedDate={selectedDate}
              events={events}
              seteventType={seteventType}
              handleDeleteEvent={handleDeleteEvent}
              handleEdit={handleEdit}
            />
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <div>
        {filterKeyword && (
          <FilterPanel events={events} filteredEvents={filteredEvents} />
        )}
      </div>
    </div>
  );
};

export default Calendar;
