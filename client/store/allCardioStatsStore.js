import Axios from "axios";

// Action Types
const SET_CARDIOSTATS = "SET_CARDIOSTATS";
const CREATE_CARDIOSTAT = "CREATE_CARDIOSTAT";
const DELETE_CARDIOSTAT = "DELETE_CARDIOSTAT";

// Action Creators
export const setCardioStats = (cardioStats) => {
  return {
    type: SET_CARDIOSTATS,
    cardioStats,
  };
};

const _createCardioStat = (cardioStat) => {
  return {
    type: CREATE_CARDIOSTAT,
    cardioStat,
  };
};

const _deleteCardioStat = (cardioStat) => {
  return {
    type: DELETE_CARDIOSTAT,
    cardioStat,
  };
};

// Thunk Creators
export const fetchCardioStats = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("/api/cardiostats");
    dispatch(setCardioStats(data));
  };
};

export const createCardioStat = (cardioStat) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/cardiostats", cardioStat);
    dispatch(_createCardioStat(created));
  };
};

export const deleteCardioStat = (id, history) => {
  return async (dispatch) => {
    const { data: cardioStat } = await Axios.delete(`/api/cardiostats/${id}`);
    dispatch(_deleteCardioStat(cardioStat));
    if (history) history.push("/cardiostats");
  };
};

// Initial State
const initialState = [];

// Reducer
export default function cardioStatsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARDIOSTATS:
      return action.cardioStats;
    case CREATE_CARDIOSTAT:
      return [...state, action.cardioStat];
    case DELETE_CARDIOSTAT:
      return state.filter((cardioStat) => cardioStat.id !== action.cardioStat.id);
    default:
      return state;
  }
}
