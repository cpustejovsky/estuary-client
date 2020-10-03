import React, { useState } from "react";
import { Formik } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { signUp } from "../../actions";
import { Button, CardActions, TextField } from "@material-ui/core/";
import emailValidator from "../../utils/emailvalidator";
import { SignUpData } from "../../models/"


const mapDispatch = {
  signUp
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any
}

const SignUp = (props: Props) => {

  let signupData: SignUpData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    password2: "",
  };

  const submitValues = (values: SignUpData) => {
    if (emailValidator(values.emailAddress)) {
      setValidEmail(false);
    } else if (values.password !== values.password2) {
      setMatchingPassword(false);
    } else {
      props.signUp(values, props.history);
    }
  };


  const [validEmail, setValidEmail] = useState(true);
  const [matchingPassword, setMatchingPassword] = useState(true);

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
                helperText={validEmail ? "" : "Invalid Email Address"}
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
            <br />
            <div>
              <TextField
                required
                error={matchingPassword ? false : true}
                helperText={matchingPassword ? "" : "Passwords do not match"}
                name="password2"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                label="Confirm Password"
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

export default connector(SignUp);
