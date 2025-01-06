import Axios from "axios";

// Action Types
const SET_STRENGTHTESTS = "SET_STRENGTHTESTS";
const CREATE_STRENGTHTEST = "CREATE_STRENGTHTEST";
const DELETE_STRENGTHTEST = "DELETE_STRENGTHTEST";

// Action Creators
export const setStrengthTests = (strengthTests) => {
  return {
    type: SET_STRENGTHTESTS,
    strengthTests,
  };
};

const _createStrengthTest = (strengthTest) => {
  return {
    type: CREATE_STRENGTHTEST,
    strengthTest,
  };
};

const _deleteStrengthTest = (strengthTest) => {
  return {
    type: DELETE_STRENGTHTEST,
    strengthTest,
  };
};

// Thunk Creators
export const fetchStrengthTests = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("/api/strengthtests");
    dispatch(setStrengthTests(data));
  };
};

export const createStrengthTest = (strengthTest) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/strengthtests", strengthTest);
    dispatch(_createStrengthTest(created));
  };
};

export const deleteStrengthTest = (id, history) => {
  return async (dispatch) => {
    const { data: strengthTest } = await Axios.delete(`/api/strengthtests/${id}`);
    dispatch(_deleteStrengthTest(strengthTest));
    if (history) history.push("/strengthtests");
  };
};

// Initial State
const initialState = [];

// Reducer
export default function strengthTestsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRENGTHTESTS:
      return action.strengthTests;
    case CREATE_STRENGTHTEST:
      return [...state, action.strengthTest];
    case DELETE_STRENGTHTEST:
      return state.filter((strengthTest) => strengthTest.id !== action.strengthTest.id);
    default:
      return state;
  }
}
