import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  UNAUTH_USER
} from '../../actions/types';

const initialState = { error: '', authenticated: '', user: {} };

/** @description reducers for authentication component
 *
 * @param {object} [state=initialState]
 * @param {object} action
 *
 * @returns {object} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case UNAUTH_USER:
      return {
        ...state,
        user: {},
        authenticated: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };

    default:
      return state;
  }
};
