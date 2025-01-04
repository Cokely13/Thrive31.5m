// singleDayStore.js
import axios from 'axios';

// Action Types
const SET_SINGLE_DAY = 'SET_SINGLE_DAY';
const UPDATE_DAY = 'UPDATE_DAY';

// Action Creators
export const setSingleDay = (day) => ({
  type: SET_SINGLE_DAY,
  day,
});

export const updateDay = (day) => ({
  type: UPDATE_DAY,
  day,
});

// Thunks
export const fetchSingleDay = (dayId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/days/${dayId}`);
    dispatch(setSingleDay(data));
  } catch (error) {
    console.error(error);
  }
};

export const modifyDay = (dayId, updatedDay) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/days/${dayId}`, updatedDay);
    dispatch(updateDay(data));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const initialState = {};

export default function singleDayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_DAY:
      return action.day;
    case UPDATE_DAY:
      return { ...state, ...action.day };
    default:
      return state;
  }
}
