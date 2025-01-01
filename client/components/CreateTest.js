import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardioStat } from "../store/allCardioStatsStore";
import { createStrengthStat } from "../store/allStrengthStatsStore";
import { fetchSingleUser} from '../store/singleUserStore';

const CreateTest = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  // Local state for form fields
  const [type, setType] = useState("cardio"); // Default to 'cardio'
  const [testType, setTestType] = useState(""); // e.g., 'mile', 'bench'
  const [result, setResult] = useState(""); // Result value
  const [minutes, setMinutes] = useState(""); // For cardio result (minutes)
  const [seconds, setSeconds] = useState(""); // For cardio result (seconds)
  const [effort, setEffort] = useState(""); // Effort on a 1-10 scale
  const [date, setDate] = useState(""); // Date of the test

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create test object
    const test = {
      type: testType,
      result: type === "cardio" ? `${minutes}:${seconds}` : result,
      effort: parseInt(effort, 10),
      date,
      userId: id,
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
    setMinutes("");
    setSeconds("");
    setEffort("");
    setDate("");
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
          {type === "cardio" ? (
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
          ) : (
            <input
              type="number"
              placeholder="e.g., 225 for strength"
              value={result}
              onChange={(e) => setResult(Math.max(0, e.target.value))}
              required
            />
          )}
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

        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default CreateTest;
