import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleEvent, updateSingleEvent } from '../store/singleEventStore';

function EventDetails() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.singleEvent);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    eventType: 'Other',
    importance: 'Medium',
    // description: '',
  });

  useEffect(() => {
    if (eventId) {
      dispatch(fetchSingleEvent(eventId));
    }
  }, [dispatch, eventId]);

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        date: event.date || '',
        time: event.time || '',
        eventType: event.eventType || 'Other',
        importance: event.importance || 'Medium',
        // description: event.description || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSingleEvent(eventId, formData));
    setIsEditing(false);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  console.log("event", event)

  return (
    <div className="event-details-container">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-event-form">
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label>
            Event Type:
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <option value="Race">Race</option>
              <option value="Workout">Workout</option>
              <option value="Meeting">Meeting</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />

          <label>
            Importance:
            <select
              name="importance"
              value={formData.importance}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <br />

          {/* <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <br /> */}

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1>{event.name}</h1>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Type:</strong> {event.eventType}</p>
          <p><strong>Importance:</strong> {event.importance}</p>
          {/* <p><strong>Description:</strong> {event.description || 'No description provided.'}</p> */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default EventDetails;
