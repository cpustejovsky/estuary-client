import { getInstance} from "./index"
import { LOG_IN, SIGN_UP } from "./types.ts";


export const login = (values, history) => async (dispatch) => {
  let instance = await getInstance();
  const response = await instance.post("/login", values);
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