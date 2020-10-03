import axios from "axios";
import { getInstance } from "./index";

import {Constants} from "./types.ts";

const { FETCH_USER, UPDATE_USER, DELETE_USER } = Constants
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
export const updateUser = (values, history) => async (dispatch) => {
  const instance = await getInstance();
  const response = await instance.patch("/user", values);
  history.push("/user");
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};

export const deleteUser = (history) => async (dispatch) => {
  const instance = await getInstance();
  const response = await instance.delete("/user");
  history.push("/");
  dispatch({
    type: DELETE_USER,
    payload: response.data,
  });
}