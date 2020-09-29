import axios from "axios";
import { LOG_IN, SIGN_UP } from "./types.ts";

const getInstance = async () => {
  const response = await axios.get("/api/token");
  const instance = axios.create({
    baseURL: "/api",
    headers: { "X-CSRF-Token": response.headers["x-csrf-token"] },
  });
  return instance
};

export const login = (values, history) => async (dispatch) => {
  let instance = await getInstance();
  const response = instance.post("/login", values)  
  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.data,
  });
};

export const signUp = (values, history) => async (dispatch) => {
  let instance = await getInstance();
  const response = await instance.post("/signup", values);
  history.push("/");
  dispatch({
    type: SIGN_UP,
    payload: response.data,
  });
};
