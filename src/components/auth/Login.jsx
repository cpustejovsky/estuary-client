import React from "react";
import { Formik } from "formik";
import { connect, useSelector } from "react-redux";
import { login } from "../../actions";
import { Button, CardActions, TextField } from "@material-ui/core/";

const Login = (props) => {
  const submitValues = (values) => {
    let history = props.history;
    console.log(values);
    props.login(values, history);
  };

  const user = useSelector((state) => state.user);

  let loginData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  return (
    <div className="center">
      <h2>Howdy!</h2>
      <p>Let's get you logged in</p>
      <Formik
        initialValues={loginData}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            submitValues(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                name="emailAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                type="email-address"
                label="Email Address"
                variant="outlined"
              />
            </div>
            <br />
            <div>
              <TextField
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
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
                Log In
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { login })(Login);
