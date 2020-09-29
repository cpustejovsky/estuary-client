import axios from "axios";
import { getInstance } from "./index";

import { FETCH_USER, UPDATE_USER } from "./types.ts";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
export const updateUser = (values, history) => async (dispatch) => {
  console.log(values)
  const instance = await getInstance();
  const response = await instance.patch("/user", values);
  console.log(response.data)
  history.push("/user");
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};
