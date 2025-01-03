import axios from "axios";

// Action Types
const SET_BOOKS = "SET_BOOKS";
const CREATE_BOOK = "CREATE_BOOK";
const DELETE_BOOK = "DELETE_BOOK";

// Action Creators
export const setBooks = (books) => ({ type: SET_BOOKS, books });
const _createBook = (book) => ({ type: CREATE_BOOK, book });
const _deleteBook = (book) => ({ type: DELETE_BOOK, book });

// Thunk Creators
export const fetchBooks = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/books");
    dispatch(setBooks(data));
  } catch (error) {
    console.error("Error fetching books", error);
  }
};

export const createBook = (book) => async (dispatch) => {
  try {
    const { data: createdBook } = await axios.post("/api/books", book);
    dispatch(_createBook(createdBook));
  } catch (error) {
    console.error("Error creating book", error);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    const { data: deletedBook } = await axios.delete(`/api/books/${id}`);
    dispatch(_deleteBook(deletedBook));
  } catch (error) {
    console.error("Error deleting book", error);
  }
};

// Reducer
const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;
    case CREATE_BOOK:
      return [...state, action.book];
    case DELETE_BOOK:
      return state.filter((book) => book.id !== action.book.id);
    default:
      return state;
  }
}
