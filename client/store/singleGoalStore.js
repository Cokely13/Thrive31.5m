import axios from "axios";

// Action Types
const SET_SINGLE_GOAL = "SET_SINGLE_GOAL";
const CLEAR_SINGLE_GOAL = "CLEAR_SINGLE_GOAL";

// Action Creators
export const setSingleGoal = (goal) => ({ type: SET_SINGLE_GOAL, goal });
export const clearSingleGoal = () => ({ type: CLEAR_SINGLE_GOAL });

// Thunk Creators
export const fetchSingleGoal = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/goals/${id}`);
    dispatch(setSingleGoal(data));
  } catch (error) {
    console.error("Error fetching single goal", error);
  }
};

export const updateSingleGoal = (id, goalDetails) => async (dispatch) => {
  try {
    const { data: updatedGoal } = await axios.put(`/api/goals/${id}`, goalDetails);
    dispatch(setSingleGoal(updatedGoal));
  } catch (error) {
    console.error("Error updating goal", error);
  }
};

// Reducer
const initialState = null;

export default function singleGoalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_GOAL:
      return action.goal;
    case CLEAR_SINGLE_GOAL:
      return null;
    default:
      return state;
  }
}
