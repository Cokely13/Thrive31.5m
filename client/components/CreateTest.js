import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCardioStat } from "../store/allCardioStatsStore"; // Import your thunk for CardioStats
import { createStrengthStat } from "../store/allStrengthStatsStore"; // Import your thunk for StrengthStats

const CreateTest = () => {
  const dispatch = useDispatch();

  // Local state for form fields
  const [type, setType] = useState("cardio"); // Default to 'cardio'
  const [testType, setTestType] = useState(""); // e.g., 'mile', 'bench'
  const [result, setResult] = useState(""); // Result value
  const [effort, setEffort] = useState(""); // Effort on a 1-10 scale
  const [date, setDate] = useState(""); // Date of the test
  const [userId, setUserId] = useState(""); // User ID (to associate with the test)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create test object
    const test = {
      type: testType,
      result,
      effort: parseInt(effort, 10),
      date,
      userId: parseInt(userId, 10),
    };

    // Dispatch the appropriate thunk based on the test type
    if (type === "cardio") {
      dispatch(createCardioStat(test));
    } else if (type === "strength") {
      dispatch(createStrengthStat(test));
    }

    // Clear the form fields
    setTestType("");
    setResult("");
    setEffort("");
    setDate("");
    setUserId("");
  };

  return (
    <div>
      <h2>Create a New Test</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Test Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
          </select>
        </label>
        <br />

        <label>
          Test Name:
          <input
            type="text"
            placeholder="e.g., mile, bench"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Result:
          <input
            type="text"
            placeholder="e.g., 6:30 for cardio or 225 for strength"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Effort (1-10):
          <input
            type="number"
            min="1"
            max="10"
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
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
          User ID:
          <input
            type="number"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default CreateTest;
