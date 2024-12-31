import Axios from "axios";

// Action Types
const SET_SINGLE_STRENGTHSTAT = "SET_SINGLE_STRENGTHSTAT";
const UPDATE_SINGLE_STRENGTHSTAT = "UPDATE_SINGLE_STRENGTHSTAT";

// Action Creators
export const _setSingleStrengthStat = (strengthStatData) => {
  return {
    type: SET_SINGLE_STRENGTHSTAT,
    strengthStatData,
  };
};

const _updateSingleStrengthStat = (strengthStatData) => {
  return {
    type: UPDATE_SINGLE_STRENGTHSTAT,
    strengthStatData,
  };
};

// Thunks
export const fetchSingleStrengthStat = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/strengthstats/${id}`);
      dispatch(_setSingleStrengthStat(data));
    } catch (error) {
      console.error("Failed to fetch single StrengthStat:", error);
    }
  };
};

export const updateSingleStrengthStat = (strengthStat) => {
  return async (dispatch) => {
    try {
      await Axios.put(`/api/strengthstats/${strengthStat.id}`, strengthStat);
      const { data: updated } = await Axios.get(`/api/strengthstats/${strengthStat.id}`);
      dispatch(_updateSingleStrengthStat(updated));
    } catch (error) {
      console.error("Failed to update StrengthStat:", error);
    }
  };
};

// Initial State
const initialState = null;

// Reducer
export default function singleStrengthStatReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_STRENGTHSTAT:
      return action.strengthStatData;
    case UPDATE_SINGLE_STRENGTHSTAT:
      return action.strengthStatData;
    default:
      return state;
  }
}
