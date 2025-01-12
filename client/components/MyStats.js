// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchSingleUser } from "../store/singleUserStore";
// import { updateSingleStrengthStat } from "../store/singleStrengthStatStore";
// import { updateSingleCardioStat } from "../store/singleCardioStatStore";

// const MyStats = () => {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.singleUser);

//   const [isEditingCardio, setIsEditingCardio] = useState(false);
//   const [editingCardioStat, setEditingCardioStat] = useState(null);
//   const [minutes, setMinutes] = useState("");
//   const [seconds, setSeconds] = useState("");

//   const [isEditingStrength, setIsEditingStrength] = useState(false);
//   const [editingStrengthStat, setEditingStrengthStat] = useState(null);
//   const [min, setMin] = useState("");

//   useEffect(() => {
//     dispatch(fetchSingleUser(id));
//   }, [dispatch, id]);

//   const handleEditCardioClick = (stat) => {
//     setEditingCardioStat(stat);
//     setIsEditingCardio(true);
//     const [minMinutes, minSeconds] = stat.min ? stat.min.split(":") : ["", ""];
//     setMinutes(minMinutes || "0");
//     setSeconds(minSeconds || "0");
//   };

//   const handleEditStrengthClick = (stat) => {
//     setEditingStrengthStat(stat);
//     setIsEditingStrength(true);
//     setMin(stat.min || "0");
//   };

//   const handleCardioSubmit = (e) => {
//     e.preventDefault();

//     const updatedStat = {
//       id: editingCardioStat.id,
//       min: `${minutes}:${String(seconds).padStart(2, "0")}`,
//     };

//     dispatch(updateSingleCardioStat(updatedStat));
//     setIsEditingCardio(false);
//     setEditingCardioStat(null);
//   };

//   const handleStrengthSubmit = (e) => {
//     e.preventDefault();

//     const updatedStat = {
//       id: editingStrengthStat.id,
//       min,
//     };

//     dispatch(updateSingleStrengthStat(updatedStat));
//     setIsEditingStrength(false);
//     setEditingStrengthStat(null);
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   const today = new Date();
//   const completedTests = (user.strengthTests || []).length + (user.cardioTests || []).length;
//   const completedBooks = (user.books || []).filter((book) => book.completed).length;
//   const completedGoals = (user.goals || []).filter((goal) => goal.status === "completed").length;
//   const pastEvents = (user.events || []).filter((event) => new Date(event.date) < today);
//   const upcomingEvents = (user.events || []).filter((event) => new Date(event.date) >= today);

//   return (
//     <div className="my-stats">
//       <h1>{user.username}'s Stats</h1>

//       {/* Records Section */}
//       <section>
//         <h2>Records</h2>
//         <ul>
//           {(user.strengthStats || []).map((stat) => (
//             <li key={stat.id}>
//               {stat.type}: {stat.record} lbs
//             </li>
//           ))}
//           {(user.cardioStats || []).map((stat) => (
//             <li key={stat.id}>
//               {stat.type}: {stat.record} (avg: {stat.averageTime})
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Cardio Minimums Section */}
//       <section>
//         <h2>Cardio Minimums</h2>
//         {isEditingCardio && editingCardioStat ? (
//           <form onSubmit={handleCardioSubmit}>
//             <h3>Editing {editingCardioStat.type} Minimum</h3>
//             <div>
//               <input
//                 type="number"
//                 placeholder="Minutes"
//                 value={minutes}
//                 onChange={(e) => setMinutes(Math.max(0, e.target.value))}
//                 required
//               />
//               :
//               <input
//                 type="number"
//                 placeholder="Seconds"
//                 value={seconds}
//                 onChange={(e) => setSeconds(Math.max(0, e.target.value))}
//                 required
//               />
//             </div>
//             <br />
//             <button type="submit">Save</button>
//             <button type="button" onClick={() => setIsEditingCardio(false)}>
//               Cancel
//             </button>
//           </form>
//         ) : (
//           <ul>
//             {(user.cardioStats || []).map((stat) => (
//               <li key={stat.id}>
//                 {stat.type}: {stat.min || "0"}
//                 <button onClick={() => handleEditCardioClick(stat)}>Edit</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Strength Minimums Section */}
//       <section>
//         <h2>Strength Minimums</h2>
//         {isEditingStrength && editingStrengthStat ? (
//           <form onSubmit={handleStrengthSubmit}>
//             <h3>Editing {editingStrengthStat.type} Minimum</h3>
//             <label>
//               Minimum:
//               <input
//                 type="number"
//                 value={min}
//                 onChange={(e) => setMin(Math.max(0, e.target.value))}
//                 required
//               />
//             </label>
//             <br />
//             <button type="submit">Save</button>
//             <button type="button" onClick={() => setIsEditingStrength(false)}>
//               Cancel
//             </button>
//           </form>
//         ) : (
//           <ul>
//             {(user.strengthStats || []).map((stat) => (
//               <li key={stat.id}>
//                 {stat.type}: {stat.min || "0"} lbs
//                 <button onClick={() => handleEditStrengthClick(stat)}>Edit</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Books Section */}
//       <section>
//         <h2>Books</h2>
//         <p>Completed: {completedBooks}</p>
//         <ul>
//           {(user.books || []).map((book) => (
//             <li key={book.id}>
//               {book.title} by {book.author} {book.completed ? "(Completed)" : "(In Progress)"}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Goals Section */}
//       <section>
//         <h2>Goals</h2>
//         <p>Completed: {completedGoals}</p>
//         <ul>
//           {(user.goals || []).map((goal) => (
//             <li key={goal.id}>
//               {goal.description} - {goal.status}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Tests Section */}
//       <section>
//         <h2>Tests</h2>
//         <p>Completed Tests: {completedTests}</p>
//         <ul>
//           {(user.strengthTests || []).map((test) => (
//             <li key={test.id}>
//               {test.type} - {test.result} lbs on {test.date} (Effort: {test.effort}/10)
//             </li>
//           ))}
//           {(user.cardioTests || []).map((test) => (
//             <li key={test.id}>
//               {test.type} - {test.result} on {test.date} (Effort: {test.effort}/10)
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Events Section */}
//       <section>
//         <h2>Events</h2>
//         <p>Past Events: {pastEvents.length}</p>
//         <p>Upcoming Events: {upcomingEvents.length}</p>
//         <div>
//           <h3>Past Events</h3>
//           <ul>
//             {pastEvents.map((event) => (
//               <li key={event.id}>
//                 {event.name} on {new Date(event.date).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3>Upcoming Events</h3>
//           <ul>
//             {upcomingEvents.map((event) => (
//               <li key={event.id}>
//                 {event.name} on {new Date(event.date).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MyStats;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleUser } from "../store/singleUserStore";
import { updateSingleStrengthStat } from "../store/singleStrengthStatStore";
import { updateSingleCardioStat } from "../store/singleCardioStatStore";

const MyStats = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  const [localUser, setLocalUser] = useState(null); // Local state for user data
  const [isEditingCardio, setIsEditingCardio] = useState(false);
  const [editingCardioStat, setEditingCardioStat] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [isEditingStrength, setIsEditingStrength] = useState(false);
  const [editingStrengthStat, setEditingStrengthStat] = useState(null);
  const [min, setMin] = useState("");

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const handleEditCardioClick = (stat) => {
    setEditingCardioStat(stat);
    setIsEditingCardio(true);
    const [minMinutes, minSeconds] = stat.min ? stat.min.split(":") : ["", ""];
    setMinutes(minMinutes || "0");
    setSeconds(minSeconds || "0");
  };

  const handleEditStrengthClick = (stat) => {
    setEditingStrengthStat(stat);
    setIsEditingStrength(true);
    setMin(stat.min || "0");
  };

  const handleCardioSubmit = async (e) => {
    e.preventDefault();

    const updatedStat = {
      id: editingCardioStat.id,
      min: `${minutes}:${String(seconds).padStart(2, "0")}`,
    };

    await dispatch(updateSingleCardioStat(updatedStat));
    setLocalUser((prevUser) => ({
      ...prevUser,
      cardioStats: prevUser.cardioStats.map((stat) =>
        stat.id === updatedStat.id ? { ...stat, min: updatedStat.min } : stat
      ),
    }));
    setIsEditingCardio(false);
    setEditingCardioStat(null);
  };

  const handleStrengthSubmit = async (e) => {
    e.preventDefault();

    const updatedStat = {
      id: editingStrengthStat.id,
      min,
    };

    await dispatch(updateSingleStrengthStat(updatedStat));
    setLocalUser((prevUser) => ({
      ...prevUser,
      strengthStats: prevUser.strengthStats.map((stat) =>
        stat.id === updatedStat.id ? { ...stat, min: updatedStat.min } : stat
      ),
    }));
    setIsEditingStrength(false);
    setEditingStrengthStat(null);
  };

  if (!localUser) {
    return <div>Loading...</div>;
  }

  const today = new Date();
  const completedTests = (localUser.strengthTests || []).length + (localUser.cardioTests || []).length;
  const completedBooks = (localUser.books || []).filter((book) => book.completed).length;
  const completedGoals = (localUser.goals || []).filter((goal) => goal.status === "completed").length;
  const pastEvents = (localUser.events || []).filter((event) => new Date(event.date) < today);
  const upcomingEvents = (localUser.events || []).filter((event) => new Date(event.date) >= today);

  return (
    <div className="my-stats">
      <h1>{localUser.username}'s Stats</h1>

      {/* Records Section */}
      <section>
        <h2>Records</h2>
        <ul>
          {(localUser.strengthStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} lbs
            </li>
          ))}
          {(localUser.cardioStats || []).map((stat) => (
            <li key={stat.id}>
              {stat.type}: {stat.record} (avg: {stat.averageTime})
            </li>
          ))}
        </ul>
      </section>

      {/* Cardio Minimums Section */}
      <section>
        <h2>Cardio Minimums</h2>
        {isEditingCardio && editingCardioStat ? (
          <form onSubmit={handleCardioSubmit}>
            <h3>Editing {editingCardioStat.type} Minimum</h3>
            <div>
              <input
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, e.target.value))}
                required
              />
              :
              <input
                type="number"
                placeholder="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, e.target.value))}
                required
              />
            </div>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditingCardio(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <ul>
            {(localUser.cardioStats || []).map((stat) => (
              <li key={stat.id}>
                {stat.type}: {stat.min || "0"}
                <button onClick={() => handleEditCardioClick(stat)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Strength Minimums Section */}
      <section>
        <h2>Strength Minimums</h2>
        {isEditingStrength && editingStrengthStat ? (
          <form onSubmit={handleStrengthSubmit}>
            <h3>Editing {editingStrengthStat.type} Minimum</h3>
            <label>
              Minimum:
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Math.max(0, e.target.value))}
                required
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditingStrength(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <ul>
            {(localUser.strengthStats || []).map((stat) => (
              <li key={stat.id}>
                {stat.type}: {stat.min || "0"} lbs
                <button onClick={() => handleEditStrengthClick(stat)}>Edit</button>
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
