import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCardioTest } from '../store/singleCardioTestStore';

const CardioTestDetails = () => {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.singleCardioTest);

  useEffect(() => {
    if (testId) {
      dispatch(fetchSingleCardioTest(testId));
    }
  }, [dispatch, testId]);

  if (!test || !test.id) {
    return <div>Loading cardio test details...</div>;
  }

  // Use the raw date string from the backend
  const formattedDate = test.date; // Assuming test.date is in "YYYY-MM-DD" format

  return (
    <div>
      <h1>Cardio Test Details</h1>
      <p><strong>Type:</strong> {test.type}</p>
      <p><strong>Result:</strong> {test.result}</p>
      <p><strong>Effort:</strong> {test.effort}/10</p>
      <p><strong>Date:</strong> {formattedDate}</p>
    </div>
  );
};

export default CardioTestDetails;
