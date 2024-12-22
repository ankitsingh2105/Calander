import React from 'react'

export default function EventOfDays({selectedDate, events, seteventType, handleDeleteEvent, handleEdit}) {
    return (
        <section>
            <h3>Events for {selectedDate.toDateString()}</h3>
            {!events[selectedDate.toDateString()] ? (
                <center>No events added</center>
            ) : (
                <ul>
                    {events[selectedDate.toDateString()].map(({ name, startTime, endTime, description, eventType }, index) => (
                        <li key={index}>
                            <strong>{name}</strong> ({startTime} - {endTime})
                            <p>{description}</p>
                            <li onClick={() => { seteventType({ type: eventType.type, color: eventType.color }) }} style={{
                                background: `${eventType.color}`,
                                border: '1px solid black',
                                textAlign: "center"
                            }
                            }>{eventType.type}</li>
                            <button onClick={() => handleDeleteEvent(index)}>Delete</button>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                        </li>
                    ))}
                </ul>

            )}
        </section>
    )
}
