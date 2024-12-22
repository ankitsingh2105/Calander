import React, { useState, useEffect } from 'react';

export default function EventForm({
  eventTypes,
  selectedDate,
  handleSaveEvent,
  closeModal,
  newEvent,
  setNewEvent,
  seteventType,
  editIndex,
}) {
  useEffect(() => {
    // Set event type if it's an edit and event type is available
    if (newEvent && newEvent.eventType) {
      seteventType(newEvent.eventType);
    }
  }, [newEvent, seteventType]);

  return (
    <section>
      <h3>{editIndex !== null ? 'Edit Event' : 'Add New Event'} for {selectedDate.toDateString()}</h3>

      <label>
        Event Name:
        <input
          type="text"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
      </label>

      <label>
        Start Time:
        <input
          type="time"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
        />
      </label>

      <label>
        End Time:
        <input
          type="time"
          value={newEvent.endTime}
          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
        />
      </label>

      <label>
        Description (optional):
        <textarea
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        ></textarea>
      </label>

      <label>
        Event Type:
        <ul className="eventTypeList">
          {eventTypes.map((eventType, index) => (
            <li
              key={index}
              onClick={() => {
                seteventType({ type: eventType.type, color: eventType.color });
                setNewEvent({ ...newEvent, eventType: eventType }); // Assign eventType to newEvent
              }}
              style={{
                background: `${eventType.color}`,
                padding: '8px',
                border: '1px solid black',
                margin: '5px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              {eventType.type}
            </li>
          ))}
        </ul>
      </label>

      <button onClick={() => handleSaveEvent(newEvent, editIndex)}>
        {editIndex !== null ? 'Save Changes' : 'Add Event'}
      </button>
      <button onClick={closeModal}>Close</button>
    </section>
  );
}
