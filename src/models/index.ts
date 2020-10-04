import {User} from "./User"
import {FreeWrite} from "./FreeWrites"
import { DefaultRootState } from "react-redux";

//TODO: Move to a better place
export interface AppState extends DefaultRootState {
  user: User
  auth: boolean | string
  projects: any[]
  freeWrites: FreeWrite[]
}

export * from "./Auth"
export * from "./FreeWrites"
export * from "./Note"
export * from "./User"