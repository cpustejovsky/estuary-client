import { SIGN_UP, LOG_IN, PASSWORD_RESET } from "../actions/types";

type Action = {
  type: string,
  payload: any
}
export default function (state = false, action: Action) {
  switch (action.type) {
    case SIGN_UP:
      return action.payload || false;
    case LOG_IN:
      return action.payload || false;
    case PASSWORD_RESET:
      return action.payload || false;
    default:
      return state;
  }
}
