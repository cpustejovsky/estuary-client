import React from "react";
import { Formik } from "formik";
import { connect, useSelector } from "react-redux";
import { updateUser } from "../../actions"
import {
  Button,
  CardActions,
  TextField,
} from "@material-ui/core/";

const Login = (props) => {
  const submitValues = (values) => {
    // let history = props.history;
    console.log(values)
    // props.updateUser(values, history);
  };

  const user = useSelector((state) => state.user);

  let updatedData ={
      firstName: "",
      lastName:"",
      emailAddress: "",
      password: ""
    };

  return (
    <div className="center">
      <h2>Howdy!</h2>
      <p>Let's get you signed up</p>
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
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
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
                    Sign Up
                  </Button>
                </CardActions>
              </form>
            )}
          </Formik>
      {/* <p>Sign in or Sign up with Google.</p>
      <div>
        <Button
          fullWidth
          component={Link}
          href="/auth/google"
          variant="contained"
          style={{color: "white"}}
          color="primary"
          size="large"
        >
          <i className="button__text__left fab fa-google"></i>Sign in with
          Google
        </Button>
      </div> */}
    </div>
  );
}

export default connect(null, { updateUser })(Login);
