import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Rater from './Rater';
import { fetchSingleUser } from '../store/singleUserStore';

const Home = ({ username }) => {
  const dispatch = useDispatch();
  const [isRaterOpen, setRaterOpen] = useState(false);
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id)); // Fetch the user's details, including days
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user?.days) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      const hasRatedYesterday = user.days.some((day) => day.date === yesterdayString);

      if (!hasRatedYesterday) {
        setRaterOpen(true);
      }
    }
  }, [user]);

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
