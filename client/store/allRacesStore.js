import axios from "axios";

// Action Types
const SET_RACES = "SET_RACES";
const CREATE_RACE = "CREATE_RACE";
const DELETE_RACE = "DELETE_RACE";

// Action Creators
export const setRaces = () => ({ type: SET_RACES, races });
const _createRace = (race) => ({ type: CREATE_RACE, race });
const _deleteRace = (race) => ({ type: DELETE_RACE, race });

// Thunk Creators
export const fetchRaces = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/races");
    dispatch(setRaces(data));
  } catch (error) {
    console.error("Error fetching races", error);
  }
};

export const createRace = (race) => async (dispatch) => {
  try {
    const { data: createdRace } = await axios.post("/api/races", race);
    dispatch(_createRace(createdRace));
  } catch (error) {
    console.error("Error creating race", error);
  }
};

export const deleteRace = (id) => async (dispatch) => {
  try {
    const { data: deletedRace } = await axios.delete(`/api/races/${id}`);
    dispatch(_deleteRace(deletedRace));
  } catch (error) {
    console.error("Error deleting race", error);
  }
};

// Reducer
const initialState = [];

export default function racesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RACES:
      return action.races;
    case CREATE_RACE:
      return [...state, action.race];
    case DELETE_RACE:
      return state.filter((race) => race.id !== action.race.id);
    default:
      return state;
  }
}
