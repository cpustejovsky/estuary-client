import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { fetchFreeWrites } from "../../actions";
import Loader from "../partials/Loader";
import { Fab, Card, CardContent, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import { AppState } from "../../models/"

const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user,
  freeWrites: Object.values(state.freeWrites)

})

const mapDispatch = {
  fetchFreeWrites
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any,
  match: any
}

function FreeWriteShow(props: Props) {
  const { auth, user, freeWrites, fetchFreeWrites, history } = props
  useEffect(() => {
    fetchFreeWrites();
  }, [fetchFreeWrites]);
  const renderFreeWrites = () => {
    if (!_.isEmpty(freeWrites)) {
      return freeWrites.map(({ content, id, title }) => {
        return (
          <Card key={id} raised className="margin-top freewrites">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {content}
              </Typography>
            </CardContent>
          </Card>
        );
      });
    }
  };

  //TODO: what is a good way to deal with auth redirects?
  if (auth || user) {
    return (
      <div>
        <div className="button button__free-writes">
          <Typography variant="h4" className="button__text__left">
            Free Writes
          </Typography>
          <Fab
            component={RouterLink}
            to="/free-writes/new"
            color="primary"
            size="medium"
          >
            <AddIcon />
          </Fab>
        </div>
        {renderFreeWrites()}
      </div>
    );
  }
  else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
  else {
    return <Loader />;
  }
}

export default connector(FreeWriteShow);
