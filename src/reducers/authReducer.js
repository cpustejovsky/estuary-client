import { SIGN_UP, LOG_IN } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.payload || false;
    case LOG_IN:
      return action.payload || false;
    default:
      return state;
  }
}
