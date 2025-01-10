import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser } from "../store/singleUserStore";
import { updateSingleCardioStat } from "../store/singleCardioStatStore";
import { updateSingleStrengthStat } from "../store/singleStrengthStatStore";

const MyStats = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  // Get user data from Redux store
  const user = useSelector((state) => state.singleUser);

  // State for editing mins
  const [editingMin, setEditingMin] = useState({});
  const [newMin, setNewMin] = useState("");

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  if (!user || !user.id) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (statId, currentMin) => {
    setEditingMin({ id: statId });
    setNewMin(currentMin || "");
  };

  const handleSaveMin = async (statId, statType) => {
    if (statType === "cardio") {
      await dispatch(updateSingleCardioStat(statId, { min: newMin }));
    } else if (statType === "strength") {
      await dispatch(updateSingleStrengthStat(statId, { min: newMin }));
    }
    setEditingMin({});
  };

  // Calculate total completed tests
  const completedTests = (user.strengthTests || []).length + (user.cardioTests || []).length;

  // Calculate total books completed
  const completedBooks = (user.books || []).filter((book) => book.completed).length;

  // Calculate total goals completed
  const completedGoals = (user.goals || []).filter((goal) => goal.status === "completed").length;

  // Separate past and upcoming events
  const today = new Date();
  const pastEvents = (user.events || []).filter((event) => new Date(event.date) < today);
  const upcomingEvents = (user.events || []).filter((event) => new Date(event.date) >= today);

  return (
    <div className="my-stats">
      <h1>{user.username}'s Stats</h1>

      {/* Record Information */}
      <section>
        <h2>Records</h2>
        <ul>
          {(user.strengthStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} lbs
              {stat.min && `, Min - ${stat.min}`}
              {editingMin.id === stat.id ? (
                <>
                  <input
                    type="text"
                    value={newMin}
                    onChange={(e) => setNewMin(e.target.value)}
                    placeholder="Set min (e.g., 100 lbs)"
                  />
                  <button onClick={() => handleSaveMin(stat.id, "strength")}>Save</button>
                  <button onClick={() => setEditingMin({})}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(stat.id, stat.min)}>
                  {stat.min ? "Change Min" : "Set Min"}
                </button>
              )}
            </li>
          ))}
          {(user.cardioStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} (avg: {stat.averageTime})
              {stat.min && `, Min - ${stat.min}`}
              {editingMin.id === stat.id ? (
                <>
                  <input
                    type="text"
                    value={newMin}
                    onChange={(e) => setNewMin(e.target.value)}
                    placeholder="Set min (e.g., 7:30)"
                  />
                  <button onClick={() => handleSaveMin(stat.id, "cardio")}>Save</button>
                  <button onClick={() => setEditingMin({})}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(stat.id, stat.min)}>
                  {stat.min ? "Change Min" : "Set Min"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Books */}
      <section>
        <h2>Books</h2>
        <p>Completed: {completedBooks}</p>
        <ul>
          {(user.books || []).map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} {book.completed ? "(Completed)" : "(In Progress)"}
            </li>
          ))}
        </ul>
      </section>

      {/* Goals */}
      <section>
        <h2>Goals</h2>
        <p>Completed: {completedGoals}</p>
        <ul>
          {(user.goals || []).map((goal) => (
            <li key={goal.id}>
              {goal.description} - {goal.status}
            </li>
          ))}
        </ul>
      </section>

      {/* Tests */}
      <section>
        <h2>Tests</h2>
        <p>Completed Tests: {completedTests}</p>
        <ul>
          {(user.strengthTests || []).map((test) => (
            <li key={test.id}>
              {test.type} - {test.result} lbs on {test.date} (Effort: {test.effort}/10)
            </li>
          ))}
          {(user.cardioTests || []).map((test) => (
            <li key={test.id}>
              {test.type} - {test.result} on {test.date} (Effort: {test.effort}/10)
            </li>
          ))}
        </ul>
      </section>

      {/* Events */}
      <section>
        <h2>Events</h2>
        <p>Past Events: {pastEvents.length}</p>
        <p>Upcoming Events: {upcomingEvents.length}</p>
        <div>
          <h3>Past Events</h3>
          <ul>
            {pastEvents.map((event) => (
              <li key={event.id}>
                {event.name} on {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                {event.name} on {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MyStats;
