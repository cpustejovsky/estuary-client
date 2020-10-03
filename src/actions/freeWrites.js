import axios from "axios";
import { Constants } from "./types.ts";

const { CREATE_FREEWRITE, FETCH_FREEWRITES } = Constants;
export const fetchFreeWrites = () => async (dispatch) => {
  const response = await axios.get("/api/free-writes");
  dispatch({
    type: FETCH_FREEWRITES,
    payload: response.data,
  });
};

export const createFreeWrite = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/free-writes", values);
  history.push("/free-writes");
  dispatch({
    type: CREATE_FREEWRITE,
    payload: response.data,
  });
};
