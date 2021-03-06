import { Constants, IProjectState } from "../actions/types";
import _ from "lodash";

type Action = {
  type: string;
  payload: any;
};

export default function (state: IProjectState = {}, action: Action) {
  const {
    FETCH_PROJECTS,
    CREATE_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
    FETCH_COMPLETED_PROJECTS,
  } = Constants;
  switch (action.type) {
    //TODO: is this the best way to deal with projects? Maybe a case where hooks would be better?
    case FETCH_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_COMPLETED_PROJECTS:
      return _.mapKeys(action.payload, "_id");
    case CREATE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_PROJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
