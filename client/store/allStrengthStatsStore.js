import Axios from "axios";

// Action Types
const SET_STRENGTHSTATS = "SET_STRENGTHSTATS";
const CREATE_STRENGTHSTAT = "CREATE_STRENGTHSTAT";
const DELETE_STRENGTHSTAT = "DELETE_STRENGTHSTAT";

// Action Creators
export const setStrengthStats = (strengthStats) => {
  return {
    type: SET_STRENGTHSTATS,
    strengthStats,
  };
};

const _createStrengthStat = (strengthStat) => {
  return {
    type: CREATE_STRENGTHSTAT,
    strengthStat,
  };
};

const _deleteStrengthStat = (strengthStat) => {
  return {
    type: DELETE_STRENGTHSTAT,
    strengthStat,
  };
};

// Thunk Creators
export const fetchStrengthStats = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("/api/strengthstats");
    dispatch(setStrengthStats(data));
  };
};

export const createStrengthStat = (strengthStat) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/strengthstats", strengthStat);
    dispatch(_createStrengthStat(created));
  };
};

export const deleteStrengthStat = (id, history) => {
  return async (dispatch) => {
    const { data: strengthStat } = await Axios.delete(`/api/strengthstats/${id}`);
    dispatch(_deleteStrengthStat(strengthStat));
    if (history) history.push("/strengthstats");
  };
};

// Initial State
const initialState = [];

// Reducer
export default function strengthStatsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STRENGTHSTATS:
      return action.strengthStats;
    case CREATE_STRENGTHSTAT:
      return [...state, action.strengthStat];
    case DELETE_STRENGTHSTAT:
      return state.filter((strengthStat) => strengthStat.id !== action.strengthStat.id);
    default:
      return state;
  }
}
