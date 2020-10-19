import React from "react";
import { Formik, Field } from "formik";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { Note } from "../../../models/"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
import { Toggle } from "./flow/NotesOrganize"

type Props = {
  show: boolean,
  toggle: Toggle,
  noteId: string,
  note: Note | null,
  categorizeNote: (
    noteId: string,
    category: string
  ) => void,
  deleteNote: (noteId: string) => void,
}

function Calendar(props: Props) {
  const {
    noteId,
    show,
    deleteNote,
    toggle,
    note
  } = props

  const submitValues = async (values: {
    title: string,
    description: string,
    date: Date,
    startTime: Date,
    endTime: Date,
  }) => {
    await axios.post("/api/calendar", values);
    deleteNote(noteId);
    toggle.Calendar();
    toggle.Actionable();
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
          label="Date"
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };
  const TimePickerField = (props: any) => {
    const { field, handleBlur, form, ...other } = props
    const currentError = form.errors[field.name];
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          clearable
          disablePast
          name={field.name}
          value={field.value}
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
            "aria-label": "change time",
          }}
          onBlur={handleBlur}
          label={other.label}
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };
  if (show) {
    return (
      <div>
        <Formik
          initialValues={{
            title: note.Content,
            description: "",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
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
                  <h1>Add Event To Calendar</h1>
                  <p>
                    <strong>
                      If you encounter an error, please email me at
                      charles@cpustejovsky.com.
                  </strong>
                  </p>
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
                    <Field
                      name="startTime"
                      label={"Start Time"}
                      component={TimePickerField}
                    />
                  </div>{" "}
                  <div className="margin-top">
                    <Field
                      name="endTime"
                      label={"End Time"}
                      component={TimePickerField}
                    />
                  </div>{" "}
                  <div className="margin-top">
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Save Event
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

export default Calendar;
