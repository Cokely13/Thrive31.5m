import axios from 'axios';

// Action Types
const SET_EVENTS = 'SET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';

// Action Creators
export const setEvents = (events) => ({ type: SET_EVENTS, events });
export const addEvent = (event) => ({ type: ADD_EVENT, event });
export const removeEvent = (eventId) => ({ type: REMOVE_EVENT, eventId });
export const updateEvent = (event) => ({ type: UPDATE_EVENT, event });

// Thunk Creators
export const fetchEvents = () => async (dispatch) => {
  try {
    const { data: events } = await axios.get('/api/events');
    dispatch(setEvents(events));
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const createEvent = (eventDetails) => async (dispatch) => {
  console.log("HEY CREATE EVENT!", eventDetails)
  try {
    const { data: newEvent } = await axios.post('/api/events', eventDetails);
    dispatch(addEvent(newEvent));
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`/api/events/${eventId}`);
    dispatch(removeEvent(eventId));
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

export const editEvent = (eventId, eventDetails) => async (dispatch) => {
  try {
    const { data: updatedEvent } = await axios.put(`/api/events/${eventId}`, eventDetails);
    dispatch(updateEvent(updatedEvent));
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

// Reducer
const initialState = [];

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return action.events;
    case ADD_EVENT:
      return [...state, action.event];
    case REMOVE_EVENT:
      return state.filter((event) => event.id !== action.eventId);
    case UPDATE_EVENT:
      return state.map((event) => (event.id === action.event.id ? action.event : event));
    default:
      return state;
  }
};

export default eventsReducer;
