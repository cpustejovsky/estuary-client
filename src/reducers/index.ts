import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notesReducer from "./notesReducer";
import projectsReducer from "./projectsReducer";
import freeWritesReducer from "./freeWritesReducer";

//TODO: specify action payload types
export default combineReducers({
  auth: authReducer,
  user: userReducer,
  freeWrites: freeWritesReducer,
  notes: notesReducer,
  projects: projectsReducer,
  form: reduxForm,
});
