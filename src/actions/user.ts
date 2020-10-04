import axios from "axios";
import { getInstance } from "./index";
import { History } from "history";
import { IRootState } from "../reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Constants } from "./types";
import { UserUpdateData } from "../components/user/UserEdit";

const { FETCH_USER, UPDATE_USER, DELETE_USER } = Constants;
export const fetchUser = (): ThunkAction<
  void,
  IRootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const response = await axios.get("/api/user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
export const updateUser = (
  values: UserUpdateData,
  history: History
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const instance = await getInstance();
  const response = await instance.patch("/user", values);
  history.push("/user");
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};

export const deleteUser = (
  history: History
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const instance = await getInstance();
  const response = await instance.delete("/user");
  history.push("/");
  dispatch({
    type: DELETE_USER,
    payload: response.data,
  });
};
