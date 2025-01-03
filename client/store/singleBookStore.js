import axios from "axios";

// Action Types
const SET_SINGLE_BOOK = "SET_SINGLE_BOOK";
const CLEAR_SINGLE_BOOK = "CLEAR_SINGLE_BOOK";

// Action Creators
export const setSingleBook = (book) => ({ type: SET_SINGLE_BOOK, book });
export const clearSingleBook = () => ({ type: CLEAR_SINGLE_BOOK });

// Thunk Creators
export const fetchSingleBook = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/books/${id}`);
    dispatch(setSingleBook(data));
  } catch (error) {
    console.error("Error fetching single book", error);
  }
};

export const updateSingleBook = (id, bookDetails) => async (dispatch) => {
  try {
    const { data: updatedBook } = await axios.put(`/api/books/${id}`, bookDetails);
    dispatch(setSingleBook(updatedBook));
  } catch (error) {
    console.error("Error updating book", error);
  }
};

// Reducer
const initialState = null;

export default function singleBookReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_BOOK:
      return action.book;
    case CLEAR_SINGLE_BOOK:
      return null;
    default:
      return state;
  }
}
