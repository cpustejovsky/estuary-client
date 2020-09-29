import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { signUp } from "../../actions";
import { Button, CardActions, TextField } from "@material-ui/core/";

const SignUp = (props) => {
  const submitValues = (values) => {
    // eslint-disable-next-line
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let history = props.history;
    if (!regex.test(values.emailAddress)) {
      setValidEmail(false);
    } else {
      props.signUp(values, history);
    }
  };

  let signupData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };

  const [validEmail, setValidEmail] = useState(true);

  return (
    <div className="center">
      <h2>Howdy!</h2>
      <p>Let's get you signed up</p>
      <Formik
        initialValues={signupData}
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
                required
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                label="First Name"
                variant="outlined"
              />
            </div>
            <br />
            <div>
              <TextField
                required
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                label="Last Name"
                variant="outlined"
              />
            </div>
            <br />
            <div>
              <TextField
                required
                error={validEmail ? false : true}
                helperText="Invalid Email Address"
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
                required
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
                Sign Up
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { signUp })(SignUp);
