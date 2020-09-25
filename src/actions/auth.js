import axios from "axios";
import {
  LOG_IN,
  SIGN_UP,
} from "./types";

export const signUp = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/signup", values);
  history.push("/");
  dispatch({
    type: SIGN_UP,
    payload: response.data,
  });
};
export const login = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/login", values);
  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.data,
  });
};
