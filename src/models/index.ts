import {User} from "./User"
import { DefaultRootState } from "react-redux";

export interface AppState extends DefaultRootState {
  user: User
  auth: string
  projects: any[]
}

export * from "./User"
