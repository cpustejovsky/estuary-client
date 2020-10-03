//AUTH
import { User } from "../models/User";
export type IAuthState = string | boolean;
export type IUserState = User;
//TODO: update these state types with accurate typing
export type IFreeWritesState = any;
export type INotesState = any;
export type IProjectState = any;
export enum Constants {
  SIGN_UP = "SIGN_UP",
  LOG_IN = "LOG_IN",
  PASSWORD_RESET = "PASSWORD_RESET",
  //USER
  FETCH_USER = "FETCH_USER",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  //FREE WRITES
  FETCH_FREEWRITES = "FETCH_FREEWRITES",
  CREATE_FREEWRITE = "CREATE_FREEWRITE",
  //NOTES
  FETCH_NOTES = "FETCH_NOTES",
  FETCH_NOTES_CATEGORY = "FETCH_NOTES_CATEGORY",
  CREATE_NOTE = "CREATE_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  //PROJECTS
  FETCH_PROJECTS = "FETCH_PROJECTS",
  FETCH_COMPLETED_PROJECTS = "FETCH_COMPLETED_PROJECTS",
  CREATE_PROJECT = "CREATE_PROJECT",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
}
