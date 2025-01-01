import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStats } from "../store/userStatsStore";

const Stats = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const stats = useSelector((state) => state.userStats); // Assuming stats are stored here

  useEffect(() => {
    dispatch(fetchUserStats(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Your Stats</h2>
      {stats ? (
        <div>
          <h3>Strength Stats</h3>
          <ul>
            {stats.strength.map((stat) => (
              <li key={stat.type}>
                {stat.type}: Record - {stat.record} lbs
              </li>
            ))}
          </ul>
          <h3>Cardio Stats</h3>
          <ul>
            {stats.cardio.map((stat) => (
              <li key={stat.type}>
                {stat.type}: Record - {stat.record}, Average - {stat.average}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default Stats;
