import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { linkNoteToProject } from "../../../actions";
import { Button, Card, CardContent } from "@material-ui/core";
import { Toggle } from "./flow/NotesOrganize"
import { Project } from "../../../models/"

type Props = {
  show: boolean,
  toggle: Toggle,
  categorizeNote: (
    noteId: string,
    category: string
  ) => void,
  linkNoteToProject: (
    noteId: string,
    projectId: string
  ) => void,
  noteId: string,
  projects: Project[]
}

function NoteForProject(props: Props) {
  const {
    show,
    toggle,
    categorizeNote,
    noteId,
    projects,
    linkNoteToProject,
  } = props
  const selectProjectforNote = (noteId: string, projectId: string) => {
    linkNoteToProject(noteId, projectId);
    toggle.NoteForProject();
    toggle.Actionable();
  };
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects.map((project) => {
        return (
          <Card
            onClick={() => selectProjectforNote(noteId, project.id)}
            raised
            key={project.id}
            className="margin-top padding-horizontal notes click"
          >
            <CardContent>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </CardContent>
          </Card>
        );
      });
    }
  };
  if (show) {
    return (
      <>
        <h2>Is this a part of a project that already exists?</h2>
        <Button
          onClick={() => {
            categorizeNote(noteId, "next");
            toggle.NoteForProject();
            toggle.Actionable();
          }}
        >
          Standalone Next Action
        </Button>
        <hr />
        <h3>List of Your Projects</h3>
        {renderProjects()}
      </>
    );
  } else {
    return null;
  }
}
export default connect(null, { linkNoteToProject })(NoteForProject);
