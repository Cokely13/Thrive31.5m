import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDay } from '../store/allDaysStore';

const Rater = ({ onClose }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  // Get yesterday's date in EST
  const getYesterdayInEST = () => {
    const now = new Date(); // Current time
    const estDate = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' }) // Force EST
    );
    estDate.setDate(estDate.getDate() - 1); // Subtract 1 day
    const year = estDate.getFullYear();
    const month = String(estDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(estDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  const yesterdayString = getYesterdayInEST();

  const [ratings, setRatings] = useState({
    mood: 0,
    exercise: 0,
    goals: 0,
    sleep: 0,
    nutrition: 0,
  });

  const handleRatingChange = (category, value) => {
    setRatings({
      ...ratings,
      [category]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(createDay({
      ...ratings,
      date: yesterdayString, // Use yesterday's date in EST
      userId: id,
    }));
    setRatings({
      mood: 0,
      exercise: 0,
      goals: 0,
      sleep: 0,
      nutrition: 0,
    });
    onClose(); // Close modal after submission
  };

  const categories = ["mood", "exercise", "goals", "sleep", "nutrition"];

  return (
    <div className="rater-modal">
      <h2>Rate Yesterday: {yesterdayString}</h2>
      {categories.map((category) => (
        <div key={category} className="rating-category">
          <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
          <input
            type="number"
            id={category}
            name={category}
            min="1"
            max="10"
            value={ratings[category]}
            onChange={(e) => handleRatingChange(category, Number(e.target.value))}
          />
        </div>
      ))}
      <button className="submit-rating" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Rater;
