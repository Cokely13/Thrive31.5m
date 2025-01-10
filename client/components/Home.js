import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Rater from './Rater';
import { fetchSingleUser } from '../store/singleUserStore';

const Home = ({ username }) => {
  const dispatch = useDispatch();
  const [isRaterOpen, setRaterOpen] = useState(false);
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  // Consistent function to get yesterday's date in EST
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

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id)); // Fetch the user's details, including days
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user?.days) {
      console.log('Checking if yesterday is rated...');
      console.log('Yesterday String (EST):', yesterdayString);
      console.log('User Days:', user.days);

      const hasRatedYesterday = user.days.some((day) => {
        console.log(`Comparing: ${day.date} === ${yesterdayString}`);
        return day.date === yesterdayString;
      });

      if (!hasRatedYesterday) {
        setRaterOpen(true);
      }
    }
  }, [user, yesterdayString]);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {isRaterOpen && (
        <div className="modal">
          <Rater onClose={() => setRaterOpen(false)} />
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
