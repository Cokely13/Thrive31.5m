import React, { useState } from 'react';

const Rater = () => {
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
      <button className="submit-rating" onClick={() => console.log(ratings)}>
        Submit
      </button>
    </div>
  );
};

export default Rater;
