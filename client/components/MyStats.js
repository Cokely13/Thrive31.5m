import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser } from "../store/singleUserStore";
import { updateSingleStrengthStat } from "../store/singleStrengthStatStore";
import { updateSingleCardioStat } from "../store/singleCardioStatStore";

const MyStats = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  const [isEditing, setIsEditing] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [formData, setFormData] = useState({
    min: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleEditClick = (stat) => {
    setEditingStat(stat);
    setIsEditing(true);

    if (stat.type === "cardio") {
      const [minutes, seconds] = stat.min ? stat.min.split(":") : ["", ""];
      setFormData({
        minutes: minutes || "",
        seconds: seconds || "",
        min: "",
      });
    } else {
      setFormData({
        min: stat.min || "",
        minutes: "",
        seconds: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStat = {
      id: editingStat.id,
      min:
        editingStat.type === "cardio"
          ? `${formData.minutes || "0"}:${String(formData.seconds || "0").padStart(2, "0")}`
          : formData.min,
    };

    if (editingStat.type === "cardio") {
      dispatch(updateSingleCardioStat(updatedStat));
    } else {
      dispatch(updateSingleStrengthStat(updatedStat));
    }

    setIsEditing(false);
    setEditingStat(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const today = new Date();
  const completedTests = (user.strengthTests || []).length + (user.cardioTests || []).length;
  const completedBooks = (user.books || []).filter((book) => book.completed).length;
  const completedGoals = (user.goals || []).filter((goal) => goal.status === "completed").length;
  const pastEvents = (user.events || []).filter((event) => new Date(event.date) < today);
  const upcomingEvents = (user.events || []).filter((event) => new Date(event.date) >= today);

  return (
    <div className="my-stats">
      <h1>{user.username}'s Stats</h1>

      {/* Records Section */}
      <section>
        <h2>Records</h2>
        <ul>
          {(user.strengthStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} lbs
            </li>
          ))}
          {(user.cardioStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} (avg: {stat.averageTime})
            </li>
          ))}
        </ul>
      </section>

      {/* Minimums Section */}
      <section>
        <h2>Minimums</h2>
        {isEditing && editingStat ? (
          <form onSubmit={handleSubmit}>
            <h3>Editing {editingStat.type} Minimum</h3>
            {editingStat.type === "cardio" ? (
              // <div>

              //   <input
              //     type="number"
              //     placeholder="Minutes"
              //     value={formData.minutes}
              //     onChange={(e) => setFormData({ ...formData, minutes: Math.max(0, e.target.value) })}
              //     required
              //   />
              //   :
              //   <input
              //     type="number"
              //     placeholder="Seconds"
              //     value={formData.seconds}
              //     onChange={(e) => setFormData({ ...formData, seconds: Math.max(0, e.target.value) })}
              //     required
              //   />
              // </div>
              <div>
              <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setFormData({ ...formData, minutes: Math.max(0, e.target.value) })}
              required
            />
            :
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setFormData({ ...formData, seconds: Math.max(0, e.target.value) })}
              required
            />
          </div>
            ) : (
              <label>
                Minimum:
                <input
                  type="number"
                  name="min"
                  value={formData.min}
                  onChange={handleChange}
                  required
                />
              </label>
            )}
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <ul>
            {(user.strengthStats || []).map((stat) => (
              <li key={stat.id}>
                {stat.type}: {stat.min || "0"} lbs
                <button onClick={() => handleEditClick(stat)}>Edit</button>
              </li>
            ))}
            {(user.cardioStats || []).map((stat) => (
              <li key={stat.id}>
                {stat.type}: {stat.min || "0"}
                <button onClick={() => handleEditClick(stat)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Books Section */}
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

      {/* Goals Section */}
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

      {/* Tests Section */}
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

      {/* Events Section */}
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
