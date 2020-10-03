import { Constants, IAuthState } from "../actions/types";


type Action = {
  type: string,
  payload: any
}
export default function (state: IAuthState = false, action: Action) {
  const {SIGN_UP, LOG_IN, PASSWORD_RESET} = Constants;
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
