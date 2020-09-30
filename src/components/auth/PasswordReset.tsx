import React, { useState } from "react";
import { Formik } from "formik";
import { Button, CardActions, TextField } from "@material-ui/core/";

export default function Login() {

  const [NoEmailFound, setNoEmailFound] = useState<boolean>(false)
  const resetPassword = (email: string) => {
    setNoEmailFound(true)
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
                error={NoEmailFound ? true: false}
                helperText={NoEmailFound ? "There are no records with that email address": ""}
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
          </form>
        )}
      </Formik>
    </div>
  );
};