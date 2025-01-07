import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchSingleUser } from "../store/singleUserStore";

const Day = () => {
  const { date } = useParams(); // Use date from URL
  const dispatch = useDispatch();
  const history = useHistory(); // Use history for navigation
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, id]);

  const currentDay = user?.days?.find((day) => day.date === date);
  const eventsForDay = user?.events?.filter((event) => event.date === date) || [];
  const strengthTestsForDay = user?.strengthTests?.filter((test) => test.date === date) || [];
  const cardioTestsForDay = user?.cardioTests?.filter((test) => test.date === date) || [];

  return (
    <div>
      <h2>Your Day: {date}</h2>

      <div>
        <h3>Events</h3>
        {eventsForDay.length > 0 ? (
          <ul>
            {eventsForDay.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> at {event.time}<br />
                Type: {event.eventType}<br />
                {event.description}
                <button onClick={() => history.push(`/eventdetails/${event.id}`)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>

      {currentDay ? (
        <>
          <div>
            <h3>Ratings</h3>
            <ul>
              <li><strong>Mood:</strong> {currentDay.mood}/10</li>
              <li><strong>Exercise:</strong> {currentDay.exercise}/10</li>
              <li><strong>Goals:</strong> {currentDay.goals}/10</li>
              <li><strong>Sleep:</strong> {currentDay.sleep}/10</li>
              <li><strong>Nutrition:</strong> {currentDay.nutrition}/10</li>
            </ul>
          </div>
        </>
      ) : (
        <p>No ratings recorded for this day yet.</p>
      )}

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

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => history.push("/createtest")} style={{ marginRight: "10px" }}>
          Create Test
        </button>
        <button onClick={() => history.push("/createevent")}>Create Event</button>
      </div>
    </div>
  );
};

export default Day;
