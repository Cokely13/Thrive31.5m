import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleUser } from "../store/singleUserStore";

const Day = () => {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, id]);

  console.log('day', dayId)

  const currentDay = user?.days?.find((day) => day.id == dayId);

  console.log('user', user)

  if (!currentDay) {
    return <p>Day not found</p>;
  }

  const eventsForDay = user?.events?.filter((event) => event.date === currentDay.date) || [];
  const strengthTestsForDay = user?.strengthTests?.filter((test) => test.date === currentDay.date) || [];
  const cardioTestsForDay = user?.cardioTests?.filter((test) => test.date === currentDay.date) || [];

  return (
    <div>
      <h2>Your Day: {currentDay.date}</h2>

      <div>
        <h3>Events</h3>
        {eventsForDay.length > 0 ? (
          <ul>
            {eventsForDay.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> at {event.time}<br />
                Type: {event.eventType}<br />
                {event.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>

      <div>
        <h3>Ratings</h3>
        <ul>
          <li><strong>Mood:</strong> {currentDay.mood}/10</li>
          <li><strong>Exercise:</strong> {currentDay.exercise}/10</li>
          <li><strong>Goals:</strong> {currentDay.goals}/10</li>
        </ul>
      </div>

      <div>
        <h3>Strength Tests</h3>
        {strengthTestsForDay.length > 0 ? (
          <ul>
            {strengthTestsForDay.map((test) => (
              <li key={test.id}>
                <strong>{test.type}:</strong> {test.result} {test.unit || "lbs"} (Effort: {test.effort}/10)
              </li>
            ))}
          </ul>
        ) : (
          <p>No strength tests recorded for this day.</p>
        )}
      </div>

      <div>
        <h3>Cardio Tests</h3>
        {cardioTestsForDay.length > 0 ? (
          <ul>
            {cardioTestsForDay.map((test) => (
              <li key={test.id}>
                <strong>{test.type}:</strong> {test.result} (Effort: {test.effort}/10)
              </li>
            ))}
          </ul>
        ) : (
          <p>No cardio tests recorded for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Day;
