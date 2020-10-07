import React, { } from "react";
import { Formik } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { updateNote } from "../../actions";
import { Button, TextareaAutosize } from "@material-ui/core";

const mapDispatch = {
  updateNote
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string,
  content: string,
  closeEditView: () => void
}
function NoteEdit(props: Props) {
  const {id, content, closeEditView, updateNote} = props
  const submitValues = (values: {Content: string}) => {
    updateNote(id, values);
    closeEditView();
  };

  return (
    <Formik
      initialValues={{ Content: content }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          submitValues(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            {" "}
            <TextareaAutosize
              className="textarea textarea__notes"
              name="Content"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Content}
            ></TextareaAutosize>
            <Button type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default connector(NoteEdit);
