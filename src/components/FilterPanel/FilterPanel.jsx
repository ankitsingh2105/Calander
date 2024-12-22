import React from 'react';

export default function FilterPanel({ events, filteredEvents }) {
  return (
    <div className="filter-panel">
      <center>
        <b>Search Results</b>
      </center>
      <ul>
        {Object.keys(events).map((dateKey) => {
          const matchingEvents = filteredEvents(dateKey);
          return matchingEvents.length > 0 ? (
            <li key={dateKey}>
              <br />
              {matchingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <strong>{event.name}</strong>
                  <p>{event.description}</p>
                  <small>{dateKey}</small>
                  <br />
                  <small>
                    {event.startTime} - {event.endTime}
                  </small>
                </div>
              ))}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
}
