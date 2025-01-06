import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../store/allEventsStore";
import { fetchSingleUser } from "../store/singleUserStore";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  // Local state for form fields
  const [name, setName] = useState(""); // Event name
  const [date, setDate] = useState(""); // Event date
  const [time, setTime] = useState(""); // Event time
  const [eventType, setEventType] = useState("Other"); // Event type
  const [importance, setImportance] = useState("Medium"); // Event importance

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create event object
    const event = {
      name,
      date,
      time,
      eventType,
      importance,
      userId: id,
    };

    // Dispatch the create event thunk
    dispatch(createEvent(event));

    // Clear the form fields
    setName("");
    setDate("");
    setTime("");
    setEventType("Other");
    setImportance("Medium");
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            placeholder="e.g., Marathon Training"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Event Type:
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
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
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />

        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;

