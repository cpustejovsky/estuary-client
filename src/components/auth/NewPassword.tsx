import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../models/"
import { Formik } from "formik";
import { Link } from "react-router-dom"
import { Button, CardActions, TextField, useTheme } from "@material-ui/core/";
import { newPassword } from "../../actions"
import emailValidator from "../../utils/emailvalidator"

const mapState = (state: AppState) => ({
  auth: state.auth,
})
const mapDispatch = {
  newPassword
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any
}

const NewPassword = (props: Props) => {
  let token = window.location.search.replace(/^([?]token=)/, "")
  const theme = useTheme();
  const { auth, newPassword, history } = props;
  console.log(history)
  const [validEmail, setValidEmail] = useState(true);
  const [matchingPassword, setMatchingPassword] = useState(true);

  type NewPasswordValues = {
    emailAddress: string,
    password: string,
    password2: string,
    token: string
  }

  let newPasswordValues: NewPasswordValues = {
    emailAddress: "",
    password: "",
    password2: "",
    token: token
  }

  const submitValues = (values: NewPasswordValues) => {
    if (emailValidator(values.emailAddress)) {
      setValidEmail(false);
    } else if (values.password !== values.password2) {
      setMatchingPassword(false)
    } else {
      newPassword(values)
    }
  };

  const renderResponseMessage = (): JSX.Element => {
    console.log(auth)
    let text: string = ""
    switch (auth) {
      case false:
        text = ""
        break;
      case "success":
        return (
          <p style={{ textAlign: "center" }}>
            Password updated. You can now <Link to="/login">login</Link>.
          </p>
        )
      case "no token found":
        text = "No token was found that matched your query parameter"
        break;
      case "expired token":
        text = "Your password reset token is expired. Please repeat the process and complete it within 60 minutes"
        break;
      default:
        text = "An error occurred."
        break;
    }
    return (
      <p style={{ color: theme.palette.warning.main }}>{text}</p>
    )
  }
  return (
    <div className="center">
      <h2>New Password</h2>
      <p>Please Enter Your Email Address and New Password</p>
      <Formik
        initialValues={newPasswordValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            submitValues(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            {/* <input type="hidden" name="token" value={token}/> */}
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
                Submit
              </Button>
            </CardActions>
            {renderResponseMessage()}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default connector(NewPassword)