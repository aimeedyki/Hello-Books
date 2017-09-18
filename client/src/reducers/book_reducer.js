import {
  BOOK_ERROR,
  ADD_BOOK,
  ADD_CATEGORY,
  GET_CATEGORIES,
  MODIFY_BOOK,
  GET_BOOKS,
  GET_BOOKS_BYCATEGORIES
} from '../actions/types';

const initialState = { error: '', books: [], categories: [], bookCategory:{} }


export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        book: action.book,
      };
    case BOOK_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category: action.category
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case MODIFY_BOOK:
      return {
        ...state
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case GET_BOOKS_BYCATEGORIES:
      return {
        ...state,
        bookCategory: action.payload,
      };
    default:
      return state;
  }

}   
