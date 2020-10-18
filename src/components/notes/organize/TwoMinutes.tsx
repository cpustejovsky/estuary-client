import React from "react";
import { Button } from "@material-ui/core";

type Props = {
  show: boolean,
  toggle: any
}

export default function TwoMinutes(props: Props) {
  const { show, toggle } = props
  if (show) {
    return (
      <>
        <h2>Will it take two minutes</h2>
        <Button
          onClick={() => {
            toggle.TwoMinutes();
            toggle.Timer();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            toggle.TwoMinutes();
            toggle.NextAction();
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
