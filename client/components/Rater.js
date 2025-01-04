import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDay } from '../store/allDaysStore';

const Rater = () => {
  const dispatch = useDispatch();
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
      date: new Date().toISOString().split('T')[0], // Adding the current date
    }));
    setRatings({
      mood: 0,
      exercise: 0,
      goals: 0,
      sleep: 0,
      nutrition: 0,
    });
  };

  const categories = ["mood", "exercise", "goals", "sleep", "nutrition"];

  return (
    <div className="rater-container">
      <h2>Rate Your Day</h2>
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
