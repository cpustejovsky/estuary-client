import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchProjects, fetchCompleteProjects } from "../../actions";
import _ from "lodash";
import Loader from "../partials/Loader";
import { Link as RouterLink, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { User, AppState } from "../../models/"

const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user,
  projects: Object.values(state.projects)
})

const mapDispatch = {
  fetchProjects,
  fetchCompleteProjects
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  done: boolean,
  match: any,
}



const ProjectsShow = (props: Props): JSX.Element => {
  const {done, match, auth, user, projects, fetchProjects, fetchCompleteProjects } = props;
  // const auth = useSelector((state: AppState) => state.auth);
  // const user: User = useSelector((state: AppState) => state.user);
  // const projects = useSelector((state: AppState) => Object.values(state.projects));
  useEffect(() => {
    if (done) {
      fetchCompleteProjects();
    } else {
      fetchProjects();
    }
  }, [fetchCompleteProjects, fetchProjects, match.path, done]);
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects
        .filter((project) => project !== 0)
        .map((project) => {
          return (
            <RouterLink to={`/projects/show/${project._id}`}>
              <Card
                raised
                key={project._id}
                className="margin-top padding-horizontal notes"
              >
                <CardContent>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            </RouterLink>
          );
        });
    }
  };
  if (auth || user) {
    return (
      <div>
        <div className="button">
          <Typography variant="h4" className="button__text__left">
            {done ? "Completed " : null}Projects
          </Typography>
          {done ? null : (
            <Fab
              component={RouterLink}
              to="/projects/new"
              color="primary"
              size="medium"
            >
              <AddIcon />
            </Fab>
          )}
        </div>
        {renderProjects()}
        <div style={{ alignContent: "center" }}>
          {done ? (
            // TODO: FIX THIS AND MAKE USEEFFECT WORK
            <Button component={RouterLink} to="/projects/list">
              Back to Projects
            </Button>
          ) : (
              <Button component={RouterLink} to="/projects/list/done">
                View Completed Projects
              </Button>
            )}
        </div>
      </div>
    );
  } else if (auth === "" && user === null) {
    return <Loader />;
  } else {
    return <Redirect to="/login" />;
  }
}



export default connector(ProjectsShow)
