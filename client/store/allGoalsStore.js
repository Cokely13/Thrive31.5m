import axios from "axios";

// Action Types
const SET_GOALS = "SET_GOALS";
const CREATE_GOAL = "CREATE_GOAL";
const DELETE_GOAL = "DELETE_GOAL";

// Action Creators
export const setGoals = (goals) => ({ type: SET_GOALS, goals });
const _createGoal = (goal) => ({ type: CREATE_GOAL, goal });
const _deleteGoal = (goal) => ({ type: DELETE_GOAL, goal });

// Thunk Creators
export const fetchGoals = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/goals");
    dispatch(setGoals(data));
  } catch (error) {
    console.error("Error fetching goals", error);
  }
};

export const createGoal = (goal) => async (dispatch) => {
  try {
    const { data: createdGoal } = await axios.post("/api/goals", goal);
    dispatch(_createGoal(createdGoal));
  } catch (error) {
    console.error("Error creating goal", error);
  }
};

export const deleteGoal = (id) => async (dispatch) => {
  try {
    const { data: deletedGoal } = await axios.delete(`/api/goals/${id}`);
    dispatch(_deleteGoal(deletedGoal));
  } catch (error) {
    console.error("Error deleting goal", error);
  }
};

// Reducer
const initialState = [];

export default function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOALS:
      return action.goals;
    case CREATE_GOAL:
      return [...state, action.goal];
    case DELETE_GOAL:
      return state.filter((goal) => goal.id !== action.goal.id);
    default:
      return state;
  }
}
