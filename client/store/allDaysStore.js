import axios from "axios";

// Action Types
const SET_DAYS = "SET_DAYS";
const CREATE_DAY = "CREATE_DAY";
const DELETE_DAY = "DELETE_DAY";

// Action Creators
export const setDays = (days) => ({ type: SET_DAYS, days });
const _createDay = (day) => ({ type: CREATE_DAY, day });
const _deleteDay = (day) => ({ type: DELETE_DAY, day });

// Thunk Creators
export const fetchDays = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/days");
    dispatch(setDays(data));
  } catch (error) {
    console.error("Error fetching days", error);
  }
};

export const createDay = (day) => async (dispatch) => {
  try {
    const { data: createdDay } = await axios.post("/api/days", day);
    dispatch(_createDay(createdDay));
  } catch (error) {
    console.error("Error creating day", error);
  }
};

export const deleteDay = (id) => async (dispatch) => {
  try {
    const { data: deletedDay } = await axios.delete(`/api/days/${id}`);
    dispatch(_deleteDay(deletedDay));
  } catch (error) {
    console.error("Error deleting day", error);
  }
};

// Reducer
const initialState = [];

export default function daysReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DAYS:
      return action.days;
    case CREATE_DAY:
      return [...state, action.day];
    case DELETE_DAY:
      return state.filter((day) => day.id !== action.day.id);
    default:
      return state;
  }
}
