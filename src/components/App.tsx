import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./partials/Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PasswordReset from "./auth/PasswordReset";
import NewPassword from "./auth/NewPassword";
import About from "./about/About";
import Landing from "./Landing";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import NotesShow from "./notes/show/NotesShow";
import NotesOrganize from "./notes/organize/flow/NotesOrganize";
import FreeWritesShow from "./freewrites/FreeWritesShow";
import FreeWritesNew from "./freewrites/FreeWritesNew";
import Test from "./Test";
import ProjectShow from "./projects/ProjectShow";
import ProjectsShow from "./projects/ProjectsShow";
import ProjectNew from "./projects/ProjectNew";
import Timer from "./notes/organize/Timer";
import { User, AppState } from "../models/."
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    warning: {
      main: '#CC3300'
    }
  },
});

const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatch = {
  fetchUser
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const App = (props: PropsFromRedux): JSX.Element => {
  const { user, auth, fetchUser } = props;
  const getUserId = (user: User) => user ? user.ID : null
  let id = getUserId(user)
  useEffect(() => {
    fetchUser();
  }, [id, auth, fetchUser]);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Header user={user} />
        <div className="site">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/test" exact component={Test} />
            <Route path="/timer" exact component={Timer} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/password-reset" exact component={PasswordReset} />
            <Route path="/new-password" exact component={NewPassword} />
            <Route path="/free-writes" exact component={FreeWritesShow} />
            <Route path="/free-writes/new" exact component={FreeWritesNew} />
            <Route path="/notes/organize" exact component={NotesOrganize} />
            {/* <Route path="/notes/:name" exact component={NotesShow} /> */}
            <Route
              path="/notes/:name"
              exact
              render={(props) => (
                <NotesShow match={props.match} />
              )}
            />
            <Route path="/user" exact component={UserShow} />
            <Route path="/user/edit" exact component={UserEdit} />
            <Route
              path="/projects/list/"
              exact
              render={({ match }) => (
                <ProjectsShow done={false} match={match} />
              )}
            />
            <Route
              path="/projects/list/done"
              exact
              render={({ match }) => (
                <ProjectsShow done={true} match={match} />
              )}
            />
            <Route
              path="/projects/new"
              exact
              render={() => <ProjectNew show={true} />}
            />
            <Route path="/projects/show/:id" exact component={ProjectShow} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default connector(App);
