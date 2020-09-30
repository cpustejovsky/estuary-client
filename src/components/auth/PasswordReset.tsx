import React, { useState } from "react";
import { Formik } from "formik";
import { Button, CardActions, TextField } from "@material-ui/core/";
import { getInstance } from "../../actions/index"
import ReCaptcha from "./ReCaptcha"
export default function Login() {

  const [requestSent, setRequestSent] = useState<string | boolean>(false)
  const [reCaptcha, showReCaptcha] = useState(false)
  const resetPassword = async (email: string) => {
    // const instance = await getInstance()
    // const response = await instance.post("/password-reset", email)
    let data: string;
    if (email === "charles.pustejovsky@gmail.com") {
      data = "email found"
    } else if (email === "charles.pustejovsky2@gmail.com") {
      data = "no email found"
    } else {
      data = "error"
    }
    if (data === "email found" || data === "no email found") {
      setRequestSent(true)
      showReCaptcha(true)
    } else {
      setRequestSent("error")
    }
  }

  const renderResponseMessage = () => {
    let text
    switch (requestSent) {
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
      <p>{text}</p>
    )
  }

  return (
    <div className="center">
      <h2>Password Reset</h2>
      <p>Please Enter Your Email Address</p>
      <Formik
        initialValues={{ emailAddress: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            resetPassword(values.emailAddress)
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
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
            {reCaptcha ? <ReCaptcha></ReCaptcha> : null}
            {renderResponseMessage()}
          </form>
        )}
      </Formik>
    </div>
  );
};