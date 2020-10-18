import React from "react";
import { Formik, Field } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { Redirect } from "react-router-dom"
import { createProject, updateProject } from "../../actions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { AppState } from "../../models/"

//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
//TODO: replace all the 'any' types

const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user,
  projects: Object.values(state.projects)
})
const mapDispatch = {
  createProject,
  updateProject
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  show: boolean,
  edit?: boolean,
  note?: any,
  project?: any,
  id?: any,
  deleteNote?: any,
  toggleProjectNew?: any,
  toggleActionable?: any,
  toggleEdit?: any,
  toggle: any
}


function ProjectNew(props: Props) {
  const {
    id,
    show,
    note,
    project,
    edit,
    deleteNote,
    createProject,
    toggleProjectNew,
    toggleActionable,
    updateProject,
    toggleEdit } = props


  const submitValues = (values: any) => {
    if (edit) {
      values.projectId = id;
      updateProject(values);
      toggleEdit()
      return;
    }
    if (note) {
      createProject(values);
      deleteNote(note.id);
      toggleProjectNew();
      toggleActionable();
      return;
    } else {
      createProject(values);
      return <Redirect to="/projects/list" />;
    }
  };

  const DatePickerField = (props: any) => {
    const { field, handleBlur, form, ...other } = props
    const currentError = form.errors[field.name];

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          clearable
          disablePast
          name={field.name}
          value={field.value}
          format="MM/dd/yyyy"
          helperText={currentError}
          error={Boolean(currentError)}
          onError={(error) => {
            // handle as a side effect
            if (error !== currentError) {
              form.setFieldError(field.name, error);
            }
          }}
          // if you are using custom validation schema you probably want to pass `true` as third argument
          onChange={(date) => form.setFieldValue(field.name, date, false)}
          {...other}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          onBlur={handleBlur}
          label="Due Date"
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };
  const title = () => {
    if (note) {
      return note.content;
    } else if (project) {
      return project.title;
    } else {
      return "";
    }
  };
  if (show) {
    return (
      <div >
        <Formik
          initialValues={{
            title: title(),
            description: project ? project.description : "",
            dueDate: project ? new Date(project.dueDate) : new Date(),
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              submitValues(values);
              resetForm();
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
                <div className="input-field center">
                  {project ? "" : <h1>New Project</h1>}
                  <div className="margin-top">
                    <TextField
                      label="Title"
                      variant="outlined"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </div>{" "}
                  <div className="margin-top">
                    <TextField
                      label="Description"
                      variant="outlined"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>{" "}
                  <div className="margin-top">
                    <Field name="date" component={DatePickerField} />
                  </div>{" "}
                  <div className="margin-top">
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {project ? "Update Project" : "Create Project"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
        </Formik>
      </div>
    );
  } else {
    return null;
  }
}

export default connector(ProjectNew);
