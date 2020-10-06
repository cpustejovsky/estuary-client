import {User} from "./User"
import {FreeWrite} from "./FreeWrites"
import {Note} from "./Note"
import { DefaultRootState } from "react-redux";

//TODO: Move to a better place
export interface AppState extends DefaultRootState {
  user: User
  auth: boolean | string
  projects: any[]
  freeWrites: FreeWrite[]
  notes: Note[]
}

export * from "./Auth"
export * from "./FreeWrites"
export * from "./Note"
export * from "./Project"
export * from "./User"