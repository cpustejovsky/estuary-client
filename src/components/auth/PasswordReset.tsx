import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../models/"
import { Formik } from "formik";
import { Button, CardActions, TextField, useTheme } from "@material-ui/core/";
import { resetPassword } from "../../actions"
import emailValidator from "../../utils/emailvalidator"

const mapState = (state: AppState) => ({
  auth: state.auth,
})
const mapDispatch = {
  resetPassword
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const PasswordReset = (props: PropsFromRedux) => {
  const theme = useTheme();
  const { auth, resetPassword } = props;

  const submitValues = (values: {emailAddress: string}) => {
    if (emailValidator(values.emailAddress)) {
      setValidEmail(false);
    } else {
      resetPassword(values)
    }
  };
  
  const [validEmail, setValidEmail] = useState(true);

  const renderResponseMessage = () => {
    let text
    switch (auth) {
      case false:
        text = ""
        break;
      case true:
        text = "email has been sent to the account"
        break;
      case "error":
        text = "a system error has occurred. Please contact support"
        break;
    }
    return (
      <p style={{ color: auth === "error" ? theme.palette.warning.main : "black" }}>{text}</p>
    )
  }
  return (
    <div className="center">
      <h2>Password Reset</h2>
      <p>Please Enter Your Email Address</p>
      <Formik
        initialValues={{ emailAddress: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            submitValues(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
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

export default connector(PasswordReset)