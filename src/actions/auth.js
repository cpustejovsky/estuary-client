import { getInstance } from "./index";
import { LOG_IN, SIGN_UP, PASSWORD_RESET } from "./types.ts";

export const login = (values, history) => async (dispatch) => {
  let instance = await getInstance();
  let response = await instance.post("/login", values);
  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.data,
  });
};

export const signUp = (values, history) => async (dispatch) => {
  let instance = await getInstance();
  let response = await instance.post("/signup", values);
  history.push("/");
  dispatch({
    type: SIGN_UP,
    payload: response.data,
  });
};

export const resetPassword = (values) => async (dispatch) => {
  let instance = await getInstance();
  let payload;
  try {
    let response = await instance.post("/password-reset", values);
    payload = response.data;
  } catch (error) {
    payload = "error";
  }
  dispatch({
    type: PASSWORD_RESET,
    payload: payload,
  });
};
