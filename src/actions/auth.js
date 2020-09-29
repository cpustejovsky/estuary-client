import axios from "axios";
import { LOG_IN, SIGN_UP } from "./types.ts";

const getToken = async () => {
  const response = await axios.get("/api/token");
  return response.headers["x-csrf-token"];
};

export const login = (values, history) => async (dispatch) => {
  let token = await getToken();
  console.log(token);
  const response = await axios.post("/api/login", values, {
    timeout: 1000,
    headers: { "X-CSRF-Token": token },
  });
  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.data,
  });
};

export const signUp = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/signup", values);
  history.push("/");
  dispatch({
    type: SIGN_UP,
    payload: response.data,
  });
};
