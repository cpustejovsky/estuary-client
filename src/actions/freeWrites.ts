import axios from "axios";
import { Constants } from "./types";
import { History } from "history";
import { IRootState } from "../reducers";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { FreeWrite } from "../models";
const { CREATE_FREEWRITE, FETCH_FREEWRITES } = Constants;
export const fetchFreeWrites = (): ThunkAction<
  void,
  IRootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const response = await axios.get("/api/free-writes");
  dispatch({
    type: FETCH_FREEWRITES,
    payload: response.data,
  });
};

export const createFreeWrite = (
  values: FreeWrite,
  history: History
): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await axios.post("/api/free-writes", values);
  history.push("/free-writes");
  dispatch({
    type: CREATE_FREEWRITE,
    payload: response.data,
  });
};
