import "./user";
import "./freeWrites";
import "./notes";
import "./projects";
import "./auth"
import axios from "axios"

export { signUp, login} from "./auth"
export { fetchUser, updateUser } from "./user";
export { fetchFreeWrites, createFreeWrite } from "./freeWrites";
export {
  fetchNotes,
  fetchProjectNotes,
  fetchNotesByCategory,
  createNote,
  updateNote,
  deleteNote,
  categorizeNote,
  linkNoteToProject,
} from "./notes";
export {
  fetchProjects,
  fetchCompleteProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject,
  completeProject
} from "./projects";

export const getInstance = async () => {
  const response = await axios.get("/api/token");
  const instance = axios.create({
    baseURL: "/api",
    headers: { "X-CSRF-Token": response.headers["x-csrf-token"] },
  });
  return instance;
};