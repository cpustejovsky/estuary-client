import React from "react";
import { Button } from "@material-ui/core";
import {Toggle} from "./flow/NotesOrganize"

type Props = {
  show: boolean,
  toggle: Toggle
}

export default function Actionable(props: Props) {
  const { show, toggle } = props
  if (show) {
    return (
      <>
        <h2>Is it actionable?</h2>
        <Button
          onClick={() => {
            toggle.Actionable();
            toggle.TwoMinutes();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            toggle.Actionable();
            toggle.NotActionable();
          }}
        >
          No
        </Button>
      </>
    );
  } else {
    return null;
  }
}
