import {User} from "./User"
import { DefaultRootState } from "react-redux";

//TODO: Move to a better place
export interface AppState extends DefaultRootState {
  user: User
  auth: string
  projects: any[]
}

export * from "./User"