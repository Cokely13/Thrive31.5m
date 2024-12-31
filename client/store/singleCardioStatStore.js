import axios from "axios";

// Action Types
const SET_SINGLE_CARDIOSTAT = "SET_SINGLE_CARDIOSTAT";
const UPDATE_SINGLE_CARDIOSTAT = "UPDATE_SINGLE_CARDIOSTAT";
const TOKEN = "token";

// Action Creators
export const _setSingleCardioStat = (cardioStatData) => {
  return {
    type: SET_SINGLE_CARDIOSTAT,
    cardioStatData,
  };
};

const _updateSingleCardioStat = (cardioStatData) => {
  return {
    type: UPDATE_SINGLE_CARDIOSTAT,
    cardioStatData,
  };
};

// Thunks
export const fetchSingleCardioStat = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cardiostats/${id}`);
      dispatch(_setSingleCardioStat(data));
    } catch (error) {
      console.error('Failed to fetch single CardioStat:', error);
    }
  };
};

export const updateSingleCardioStat = (formData) => {
  return async (dispatch) => {
    try {
      // Make sure to pass the formData directly to axios.put
      await axios.put(`/api/cardiostats/${formData.get('id')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Fetch the updated CardioStat data
      const { data: cardioStatData } = await axios.get(`/api/cardiostats/${formData.get('id')}`);
      dispatch(_updateSingleCardioStat(cardioStatData));
    } catch (error) {
      console.error('Failed to update CardioStat:', error);
    }
  };
};

// Reducer
const initialState = [];
const singleCardioStatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CARDIOSTAT:
      return action.cardioStatData;
    case UPDATE_SINGLE_CARDIOSTAT:
      return action.cardioStatData;
    default:
      return state;
  }
};

export default singleCardioStatReducer;
