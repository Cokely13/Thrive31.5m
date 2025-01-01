// Import necessary modules
import axios from 'axios';

// Action Types
const SET_SINGLE_EVENT = 'SET_SINGLE_EVENT';
const CLEAR_SINGLE_EVENT = 'CLEAR_SINGLE_EVENT';

// Action Creators
export const setSingleEvent = (event) => ({ type: SET_SINGLE_EVENT, event });
export const clearSingleEvent = () => ({ type: CLEAR_SINGLE_EVENT });

// Thunk Creators
export const fetchSingleEvent = (eventId) => async (dispatch) => {
  try {
    const { data: event } = await axios.get(`/api/events/${eventId}`);
    dispatch(setSingleEvent(event));
  } catch (error) {
    console.error('Error fetching single event:', error);
  }
};

export const updateSingleEvent = (eventId, eventDetails) => async (dispatch) => {
  try {
    const { data: updatedEvent } = await axios.put(`/api/events/${eventId}`, eventDetails);
    dispatch(setSingleEvent(updatedEvent));
  } catch (error) {
    console.error('Error updating single event:', error);
  }
};

// Reducer
const initialState = null;

const singleEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_EVENT:
      return action.event;
    case CLEAR_SINGLE_EVENT:
      return null;
    default:
      return state;
  }
};

export default singleEventReducer;
