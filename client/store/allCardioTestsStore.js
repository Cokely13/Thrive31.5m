import Axios from "axios";

// Action Types
const SET_CARDIOTESTS = "SET_CARDIOTESTS";
const CREATE_CARDIOTEST = "CREATE_CARDIOTEST";
const DELETE_CARDIOTEST = "DELETE_CARDIOTEST";

// Action Creators
export const setCardioTests = (cardioTests) => {
  return {
    type: SET_CARDIOTESTS,
    cardioTests,
  };
};

const _createCardioTest = (cardioTest) => {
  return {
    type: CREATE_CARDIOTEST,
    cardioTest,
  };
};

const _deleteCardioTest = (cardioTest) => {
  return {
    type: DELETE_CARDIOTEST,
    cardioTest,
  };
};

// Thunk Creators
export const fetchCardioTests = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("/api/cardiotests");
    dispatch(setCardioTests(data));
  };
};

export const createCardioTest = (cardioTest) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/cardiotests", cardioTest);
    dispatch(_createCardioTest(created));
  };
};

export const deleteCardioTest = (id, history) => {
  return async (dispatch) => {
    const { data: cardioTest } = await Axios.delete(`/api/cardiotests/${id}`);
    dispatch(_deleteCardioTest(cardioTest));
    if (history) history.push("/cardiotests");
  };
};

// Initial State
const initialState = [];

// Reducer
export default function cardioTestsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARDIOTESTS:
      return action.cardioTests;
    case CREATE_CARDIOTEST:
      return [...state, action.cardioTest];
    case DELETE_CARDIOTEST:
      return state.filter((cardioTest) => cardioTest.id !== action.cardioTest.id);
    default:
      return state;
  }
}
