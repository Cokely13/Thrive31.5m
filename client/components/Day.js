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

  const currentDay = user?.Days?.find((day) => day.id === parseInt(dayId));

  return (
    <div>
      <h2>Your Day</h2>

      <div>
        <h3>Events for Today</h3>
        {currentDay?.Events?.length > 0 ? (
          <ul>
            {currentDay.Events.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.time} <br /> {event.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled for today.</p>
        )}
      </div>

      <div>
        <h3>Your Ratings for Today</h3>
        {currentDay?.Ratings?.length > 0 ? (
          <ul>
            {currentDay.Ratings.map((rating) => (
              <li key={rating.id}>
                <strong>{rating.category}</strong>: {rating.value}/10
              </li>
            ))}
          </ul>
        ) : (
          <p>No ratings submitted for today.</p>
        )}
      </div>
    </div>
  );
};

export default Day;
