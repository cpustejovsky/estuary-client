import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, DefaultRootState, useSelector } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./partials/Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
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
type Props = {
  fetchUser(): (dispatch: any) => Promise<void>
}

function App(props: Props) {
  const user: User = useSelector((state: AppState) => state.user);
  const auth = useSelector((state: AppState) => state.auth);
  const getUserId = (user: User) => user ? user.ID : null
  let id = getUserId(user)
  useEffect(() => {
    fetchUser();
  }, [id, auth, fetchUser]);



  return (
    <Router history={history}>
      <Header user={user} />
      <div className="site">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/test" exact component={Test} />
          <Route path="/timer" exact component={Timer} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/free-writes" exact component={FreeWritesShow} />
          <Route path="/free-writes/new" exact component={FreeWritesNew} />
          <Route path="/notes/organize" exact component={NotesOrganize} />
          <Route path="/notes/:name" exact component={NotesShow} />
          <Route path="/user" exact component={UserShow} />
          <Route path="/user/edit" exact component={UserEdit} />
          <Route
            path="/projects/list/"
            exact
            render={({match}) => (
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
            render={() => <ProjectNew show={true} history={history} />}
          />
          <Route path="/projects/show/:id" exact component={ProjectShow} />
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { fetchUser })(App);
