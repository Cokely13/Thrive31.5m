import axios from "axios";

// Action Types
const SET_SINGLE_RACE = "SET_SINGLE_RACE";
const CLEAR_SINGLE_RACE = "CLEAR_SINGLE_RACE";

// Action Creators
export const setSingleRace = (race) => ({ type: SET_SINGLE_RACE, race });
export const clearSingleRace = () => ({ type: CLEAR_SINGLE_RACE });

// Thunk Creators
export const fetchSingleRace = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/races/${id}`);
    dispatch(setSingleRace(data));
  } catch (error) {
    console.error("Error fetching single race", error);
  }
};

export const updateSingleRace = (id, raceDetails) => async (dispatch) => {
  try {
    const { data: updatedRace } = await axios.put(`/api/races/${id}`, raceDetails);
    dispatch(setSingleRace(updatedRace));
  } catch (error) {
    console.error("Error updating race", error);
  }
};

// Reducer
const initialState = null;

export default function singleRaceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_RACE:
      return action.race;
    case CLEAR_SINGLE_RACE:
      return null;
    default:
      return state;
  }
}
