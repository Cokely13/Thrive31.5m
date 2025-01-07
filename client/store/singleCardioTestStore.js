import axios from 'axios';

// Action Types
const SET_SINGLE_CARDIO_TEST = 'SET_SINGLE_CARDIO_TEST';
const UPDATE_CARDIO_TEST = 'UPDATE_CARDIO_TEST';

// Action Creators
export const setSingleCardioTest = (test) => ({
  type: SET_SINGLE_CARDIO_TEST,
  test,
});

export const updateCardioTest = (test) => ({
  type: UPDATE_CARDIO_TEST,
  test,
});

// Thunks
export const fetchSingleCardioTest = (testId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/cardiotests/${testId}`);
    dispatch(setSingleCardioTest(data));
  } catch (error) {
    console.error(error);
  }
};

export const modifyCardioTest = (testId, updatedTest) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/cardiotests/${testId}`, updatedTest);
    dispatch(updateCardioTest(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const initialState = {};

export default function singleCardioTestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_CARDIO_TEST:
      return action.test;
    case UPDATE_CARDIO_TEST:
      return { ...state, ...action.test };
    default:
      return state;
  }
}
