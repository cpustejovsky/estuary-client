import React from "react";
import { Formik } from "formik";
import { connect, useSelector } from "react-redux";
import { updateUser } from "../../actions";
import {
  Button,
  Card,
  Checkbox,
  CardActions,
  FormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core/";

const UserEdit = (props) => {
  const submitValues = (values) => {
    let history = props.history;
    props.updateUser(values, history);
  };

  const user = useSelector((state) => state.user);
  const updateDefault = (key) => {
    if (user) {
      console.log(key)
      console.log(user[key])
      return user[key];
    }
  };
  const [emailUpdateChecked, setEmailUpdateChecked] = React.useState(updateDefault("EmailUpdates"));
  const [advancedViewChecked, setAdvancedViewChecked] = React.useState(updateDefault("AdvancedView"));
  const handleClick = (event) => {
    setEmailUpdateChecked(!event.target.emailUpdateChecked);
    setAdvancedViewChecked(!event.target.advancedViewChecked);
  };
  let updatedData;
  if (user) {
    updatedData = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      EmailUpdates: user.EmailUpdates,
      AdvancedView: user.AdvancedView
    };
  }

  if (user) {
    return (
      <div >
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
              handleChange,
              handleBlur,
              handleSubmit,
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
                        checked={values.EmailUpdates ? emailUpdateChecked: null}
                        onChange={handleChange}
                        onClick={handleClick}
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
                <br/>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.AdvancedView ? advancedViewChecked: null}
                        onChange={handleChange}
                        onClick={handleClick}
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
                  style={{ justifyContent: "center" }}
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
                </CardActions>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default connect(null, { updateUser })(UserEdit);
