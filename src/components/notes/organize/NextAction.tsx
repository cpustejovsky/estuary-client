import React from "react";
import { Button } from "@material-ui/core";

import { Toggle } from "./flow/NotesOrganize"
type Props = {
  show: boolean,
  toggle: Toggle
}

export default function NextAction(props: Props) {
  const {
    show,
    toggle
  } = props
  if (show) {
    return (
      <>
        <h2>Is this a next physical action or something larger (a project)?</h2>
        <Button
          onClick={() => {
            toggle.NextAction()
            toggle.NoteForProject();
          }}
        >
          Next Action
        </Button>
        <Button
          onClick={() => {
            toggle.NextAction();
            toggle.ProjectNew();
          }}
        >
          Project
        </Button>
      </>
    );
  } else {
    return null;
  }
}
