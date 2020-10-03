import { Constants, IUserState } from "../actions/types";

type Action = {
  type: string;
  payload: any;
};

const emptyUser: IUserState = {
  ID: "",
  FirstName: "",
  LastName: "",
  EmailAddress: "",
  EmailUpdates: false,
  AdvancedView: false,
};

export default function (state: IUserState = emptyUser, action: Action) {
  const { UPDATE_USER, FETCH_USER, DELETE_USER } = Constants;
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_USER:
      return action.payload || false;
    case DELETE_USER:
      return false;
    default:
      return state;
  }
}
