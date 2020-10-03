import { getInstance } from "./index";
import { Constants } from "./types";
import { NewPasswordData, LoginData, SignUpData } from "../models";
import { History } from "history";
import { IRootState } from "../reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

const { LOG_IN, SIGN_UP, PASSWORD_RESET } = Constants;

export const login = (
  values: LoginData,
  history: History
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  let instance = await getInstance();
  let response = await instance.post("/login", values);
  history.push("/");
  dispatch({
    type: LOG_IN,
    payload: response.data,
  });
};

export const signUp = (
  values: SignUpData,
  history: History
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  let instance = await getInstance();
  let response = await instance.post("/signup", values);
  history.push("/");
  dispatch({
    type: SIGN_UP,
    payload: response.data,
  });
};

export const resetPassword = (values: {
  emailAddress: string;
}): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
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

export const newPassword = (
  values: NewPasswordData
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  let instance = await getInstance();
  let payload;
  try {
    let response = await instance.post("/new-password", values);
    payload = response.data;
  } catch (error) {
    payload = error;
  }
  dispatch({
    type: PASSWORD_RESET,
    payload: payload,
  });
};
