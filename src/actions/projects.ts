import axios from "axios";
import { Constants } from "./types";
import { IRootState } from "../reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Project } from "../models";

const {
  FETCH_COMPLETED_PROJECTS,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} = Constants;
export const fetchProjects = (): ThunkAction<
  void,
  IRootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const response = await axios.get("/api/projects");
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};

export const fetchCompleteProjects = (): ThunkAction<
  void,
  IRootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const response = await axios.get("/api/projects/done");
    dispatch({
      type: FETCH_COMPLETED_PROJECTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("OOPS\n\n");
    console.error(error);
  }
};
export const fetchProject = (
  id: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.get(`/api/projects/show/${id}`);
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};

export const createProject = (
  values: Project
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.post("/api/projects", values);
  dispatch({
    type: CREATE_PROJECT,
    payload: response.data,
  });
};

export const updateProject = (
  values: Project
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.patch("/api/projects", values);
  dispatch({
    type: UPDATE_PROJECT,
    payload: response.data,
  });
};

export const completeProject = (
  id: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.patch("/api/projects/done", { projectId: id });
  dispatch({
    type: DELETE_PROJECT,
    payload: response.data._id,
  });
};

export const deleteProject = (
  projectId: string
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.delete(`/api/projects/${projectId}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: response.data,
  });
};
