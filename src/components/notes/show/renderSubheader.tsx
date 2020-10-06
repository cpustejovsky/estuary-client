import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";
import { Note } from "../../../models";

export default function renderSubHeader(notes: Note[], match: any) {
  const renderNotesLength = () => !_.isEmpty(notes) ? notes.length : 0
  if (renderNotesLength() > 0) {
    return (
      <div className="button button__notes">
        <Typography variant="h4" className="button__text__left">
          {match.params.name.toUpperCase()} ({renderNotesLength() || 0})
        </Typography>
        <Button
          component={RouterLink}
          to="/notes/organize"
          variant="contained"
          color="primary"
        >
          Organize
        </Button>
      </div>
    );
  } else {
    return (
      <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
        {match.params.name.toUpperCase()} ({renderNotesLength() || 0})
      </Typography>
    );
  }
}
