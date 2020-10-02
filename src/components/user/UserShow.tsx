import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import  Loader from "../partials/Loader"
import { AppState } from "../../models/"
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const User = (props: PropsFromRedux) => {
  const { user, auth } = props
  //TODO: Add Note Statistics In
  // const [stats, setStats] = useState({});
  // const fetchNotestatistics = async () => {
  //   let response = await axios.get("/api/notes/stats");
  //   setStats(response.data);
  // };
  // useEffect(() => {
  //   fetchNotestatistics();
  // }, []);
  // const renderStatistics = (stats) =>
  //   Object.keys(stats).map((key) => (
  //     <li>
  //       {key.toUpperCase()}: {stats[key]}
  //     </li>
  //   ));

  // renderStatistics(stats);
  if (!auth && !user) {
    return <Loader />;
  } else if (user) {
    return (
      <div>
        <Card raised>
          <CardContent className="card-content">
            <Typography gutterBottom variant="h4">
              {user.FirstName} {user.LastName}
            </Typography>
            <p>
              <strong>Email Address: </strong>
              {user.EmailAddress}
            </p>
            <p>
              <strong>Daily Email Updates: </strong>
              {user.EmailUpdates === true ? "On" : "Off"}
            </p>
            <p>
              <strong>Advanced View: </strong>
              {user.AdvancedView === true ? "On" : "Off"}
            </p>
            <hr />
            {/* <Typography gutterBottom variant="h5">
              Note Statistics
            </Typography>
            <ul>{renderStatistics(stats)}</ul> */}
          </CardContent>
          <CardActions className="card-action">
            <Button component={RouterLink} to="/user/edit">
              Edit Profile
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return <Loader />
  }
}
export default connector(User);
