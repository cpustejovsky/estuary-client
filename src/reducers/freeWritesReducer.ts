import {Constants, IFreeWritesState} from "../actions/types";
import _ from "lodash";

type Action = {
  type: string,
  payload: any
}

export default function (state: IFreeWritesState = {}, action: Action) {
  const { CREATE_FREEWRITE, FETCH_FREEWRITES } = Constants;
  switch (action.type) {
    case FETCH_FREEWRITES:
      return { ...state, ..._.mapKeys(action.payload, "_id") } || false;
    case CREATE_FREEWRITE:
      return { ...state, [action.payload._id]: action.payload } || false;
    //TODO: when you add in delete, make sure to check if value !== "CastError"
    default:
      return state;
  }
}
