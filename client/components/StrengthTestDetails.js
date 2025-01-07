import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleStrengthTest } from '../store/singleStrengthTestStore';

const StrengthTestDetails = () => {
  const { testId } = useParams();
  const dispatch = useDispatch();
  const test = useSelector((state) => state.singleStrengthTest);

  useEffect(() => {
    if (testId) {
      dispatch(fetchSingleStrengthTest(testId));
    }
  }, [dispatch, testId]);

  if (!test || !test.id) {
    return <div>Loading strength test details...</div>;
  }

  // Use the date string directly to avoid timezone shifts
  const formattedDate = test.date; // Assuming test.date is already in "YYYY-MM-DD" format

  return (
    <div>
      <h1>Strength Test Details</h1>
      <p><strong>Type:</strong> {test.type}</p>
      <p><strong>Result:</strong> {test.result}</p>
      <p><strong>Effort:</strong> {test.effort}/10</p>
      <p><strong>Date:</strong> {formattedDate}</p>
    </div>
  );
};

export default StrengthTestDetails;
