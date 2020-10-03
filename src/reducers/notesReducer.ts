import { Constants, INotesState } from "../actions/types";
import _ from "lodash";

type Action = {
  type: string;
  payload: any;
};

export default function (state: INotesState = {}, action: Action) {
  const {
    CREATE_NOTE,
    FETCH_NOTES,
    DELETE_NOTE,
    UPDATE_NOTE,
    FETCH_NOTES_CATEGORY,
  } = Constants;
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    //TODO: see if there's a better way to deal with note categories
    case FETCH_NOTES_CATEGORY:
      return _.mapKeys(action.payload, "_id");
    case CREATE_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_NOTE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
