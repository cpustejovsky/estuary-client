import { UPDATE_USER, FETCH_USER, DELETE_USER } from "../actions/types.ts";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER:
      return action.payload || false;
    case DELETE_USER:
      return false
    default:
      return state;
  }
}
