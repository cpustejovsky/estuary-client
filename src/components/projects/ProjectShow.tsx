import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import Project from "./Project";
import Loader from "../partials/Loader";
import { fetchProject, fetchProjectNotes } from "../../actions";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";

import { AppState } from "../../models/"

//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
//TODO: replace all the 'any' types

const mapState = (state: AppState) => ({
  projects: state.projects,
  notes: state.notes,
})

const mapDispatch = {
  fetchProject,
  fetchProjectNotes
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any,
  match: any
}

function ProjectShow(props: Props) {
  const {projects, notes, fetchProjectNotes, fetchProject, history, match} = props;
  const project = projects[match.params.id]
  useEffect(() => {
    fetchProject(match.params.id);
    fetchProjectNotes(match.params.id);
  }, [fetchProject, fetchProjectNotes, match.params.id]);
  if (project) {
    return (
      <div>
        <div className="button">
          <Button component={RouterLink} to="/projects/list">
            Back to Projects
          </Button>
        </div>
        <Project
          title={project.title}
          description={project.description}
          dueDate={project.dueDate}
          id={project._id}
          notes={notes}
          history={history}
          complete={project.completed}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default connector(ProjectShow);
