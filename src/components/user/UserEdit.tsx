import React, { useState } from "react";
import { Formik } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../models/"
import { User } from "../../models/User"
import Loader from "../partials/Loader"
import { updateUser, deleteUser } from "../../actions";
import { green, red, grey } from "@material-ui/core/colors";
import {
  Button,
  Card,
  Checkbox,
  CardActions,
  FormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core/";

const mapState = (state: AppState) => ({
  user: state.user,
})
const mapDispatch = {
  updateUser, deleteUser
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any
}

export type UserUpdateData = {
  FirstName: string,
  LastName: string,
  EmailUpdates: boolean,
  AdvancedView: boolean,
}

const UserEdit = (props: Props) => {
  const { history, updateUser, deleteUser } = props
  const user: User = props.user;
  const [deleteShow, setDeleteShow] = useState(false);
  const toggleDelete = () => setDeleteShow(!deleteShow);

  const renderDelete = () => {
    if (deleteShow) {
      return (
        <div style={{ justifyContent: "center" }}>
          <CardActions>
            <Button disabled style={{ color: grey[500] }}>
              Are you sure?
            </Button>
          </CardActions>
          <CardActions>
            <Button
              style={{ color: green[500] }}
              onClick={() => {
                deleteUser(history);
                toggleDelete();
              }}
              className="click"
            >
              Yes
            </Button>
            <Button
              style={{ color: red[500] }}
              onClick={() => toggleDelete()}
              className="click"
            >
              No
            </Button>
          </CardActions>
        </div>
      );
    } else {
      return null;
    }
  };

  const submitValues = (values: UserUpdateData) => {
    updateUser(values, history);
  };

  let updatedData = {
    FirstName: user ? user.FirstName : "",
    LastName: user ? user.LastName : "",
    EmailUpdates: user ? user.EmailUpdates : true,
    AdvancedView: user ? user.AdvancedView : true,
  }

  if (user) {
    return (
      <div>
        <Card raised style={{ padding: "20px", minWidth: "33%" }}>
          <Typography align="center" gutterBottom variant="h4" component="h2">
            Update User Profile
          </Typography>
          <Formik
            initialValues={updatedData}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                submitValues(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      name="FirstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.FirstName}
                      fullWidth
                      label="First Name"
                      variant="outlined"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      name="LastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.LastName}
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                    />
                  </div>
                  <br />
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            values.EmailUpdates
                          }
                          onChange={handleChange}
                          color="primary"
                          id="email-updates"
                          name="EmailUpdates"
                          onBlur={handleBlur}
                          value={values.EmailUpdates}
                        />
                      }
                      label="Daily Email Updates"
                    />
                  </div>
                  <br />
                  <div>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            values.AdvancedView
                          }
                          onChange={handleChange}
                          color="primary"
                          id="advanced-view"
                          name="AdvancedView"
                          onBlur={handleBlur}
                          value={values.AdvancedView}
                        />
                      }
                      label="Advanced Organization View"
                    />
                  </div>
                  <CardActions
                    className="margin-top"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      Save
                  </Button>
                    <Button
                      onClick={() => toggleDelete()}
                      size="large"
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                  </Button>
                  </CardActions>
                  {renderDelete()}
                </form>
              )}
          </Formik>
        </Card>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default connector(UserEdit);
