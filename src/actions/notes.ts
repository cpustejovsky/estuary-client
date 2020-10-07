import axios from "axios";
import { Constants } from "./types";
import { IRootState } from "../reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getInstance } from "./index";

const {
  FETCH_NOTES,
  FETCH_NOTES_CATEGORY,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
} = Constants;
export const fetchNotes = (): ThunkAction<
  void,
  IRootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const response = await axios.get("/api/notes");
  dispatch({
    type: FETCH_NOTES,
    payload: response.data,
  });
};
export const fetchProjectNotes = (
  projectId: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.get(`/api/notes/project/${projectId}`);
  dispatch({
    type: FETCH_NOTES,
    payload: response.data,
  });
};
export const fetchNotesByCategory = (
  categoryName: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.get(`/api/notes/category/${categoryName}`);
  dispatch({
    type: FETCH_NOTES_CATEGORY,
    payload: response.data,
  });
};

export type NewNote = {
  content: string;
};

export const createNote = (
  values: NewNote
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const instance = await getInstance();
  const response = await instance.post("/notes", values);
  dispatch({
    type: CREATE_NOTE,
    payload: response.data,
  });
};

export type UpdatedNotee = {
  ID: string;
  Content: string;
};

export const updateNote = (
  id: string,
  values: { Content: string }
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const instance = await getInstance();
  const response = await instance.patch(`/notes/${id}`, values);
  dispatch({
    type: UPDATE_NOTE,
    payload: response.data,
  });
};

export const deleteNote = (
  noteId: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  await axios.delete("/api/notes", { data: { noteId: noteId } });
  dispatch({
    type: DELETE_NOTE,
    payload: noteId,
  });
};

export const categorizeNote = (
  noteId: string,
  category: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.patch(`/api/notes/${category}`, { noteId });
  dispatch({
    type: UPDATE_NOTE,
    payload: response.data,
  });
};

export const linkNoteToProject = (
  noteId: string,
  projectId: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.patch("/api/notes/project", {
    noteId,
    projectId,
  });
  dispatch({
    type: UPDATE_NOTE,
    payload: response.data,
  });
};
