import axios from 'axios';

// Action Types
const SET_SINGLE_STRENGTH_TEST = 'SET_SINGLE_STRENGTH_TEST';
const UPDATE_STRENGTH_TEST = 'UPDATE_STRENGTH_TEST';

// Action Creators
export const setSingleStrengthTest = (test) => ({
  type: SET_SINGLE_STRENGTH_TEST,
  test,
});

export const updateStrengthTest = (test) => ({
  type: UPDATE_STRENGTH_TEST,
  test,
});

// Thunks
export const fetchSingleStrengthTest = (testId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/strengthtests/${testId}`);
    dispatch(setSingleStrengthTest(data));
  } catch (error) {
    console.error(error);
  }
};

export const modifyStrengthTest = (testId, updatedTest) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/strengthtests/${testId}`, updatedTest);
    dispatch(updateStrengthTest(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const initialState = {};

export default function singleStrengthTestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_STRENGTH_TEST:
      return action.test;
    case UPDATE_STRENGTH_TEST:
      return { ...state, ...action.test };
    default:
      return state;
  }
}
