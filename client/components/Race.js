import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRaces } from '../store/allRacesStore'; // Adjust the import path based on your project structure

function Races() {
  const dispatch = useDispatch();

  // Access races from Redux store
  const races = useSelector((state) => state.allRaces);
  useSelector((state) => state.allAnswers);
  const loading = useSelector((state) => state.allRaces.loading);
  const error = useSelector((state) => state.allRaces.error);

  console.log("races", races)

  // Fetch races when the component mounts
  useEffect(() => {
    dispatch(fetchRaces());
  }, [dispatch]);

  if (loading) {
    return <div>Loading races...</div>;
  }

  if (error) {
    return <div>Error loading races: {error}</div>;
  }

  return (
    <div className="races-container">
      <h1>Races</h1>
      <div className="races-list">
        {races.map((race) => (
          <div key={race.id} className="race-card">
            <h2>{race.name}</h2>
            <p>Date: {new Date(race.date).toLocaleDateString()}</p>
            <p>Location: {race.location}</p>
            <p>Distance: {race.distance}</p>
            {race.url && (
              <a href={race.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Races;
