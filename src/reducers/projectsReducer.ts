import {
  FETCH_PROJECTS,
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  FETCH_COMPLETED_PROJECTS,
} from "../actions/types";

type Action = {
  type: string;
  payload: any;
};

import _ from "lodash";
export default function (state = {}, action: Action) {
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
