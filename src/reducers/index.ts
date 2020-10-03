import { combineReducers } from "redux";
import { FormReducer, reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notesReducer from "./notesReducer";
import projectsReducer from "./projectsReducer";
import freeWritesReducer from "./freeWritesReducer";
import {IAuthState, IUserState, IFreeWritesState, INotesState} from "../actions/types"

export interface IRootState {
  auth: IAuthState,
  user: IUserState,
  freeWrites: IFreeWritesState,
  notes: INotesState,
  projects: IProjectState,
  form: FormReducer,
}

//TODO: specify action payload types
export default combineReducers({
  auth: authReducer,
  user: userReducer,
  freeWrites: freeWritesReducer,
  notes: notesReducer,
  projects: projectsReducer,
  form: reduxForm,
});
