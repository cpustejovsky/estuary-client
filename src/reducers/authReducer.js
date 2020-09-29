import { SIGN_UP, LOG_IN } from "../actions/types.ts";

export default function (state = false, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.payload || false;
    case LOG_IN:
      return action.payload || false;
    default:
      return state;
  }
}
