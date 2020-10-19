import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { Toggle } from "./flow/NotesOrganize"
type Props = {
  show: boolean,
  toggle: Toggle,
  categorizeNote: (
    noteId: string,
    category: string
  ) => void,
  noteId: string, 
}

const Timer = (props: Props) => {
  const { show, toggle, categorizeNote, noteId } = props;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function timerChange() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds < 120) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (isActive && seconds >= 120) {
      //TODO: change view after two minutes instead of alert
      alert("two minutes has passed, you should mark this as done and move on");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  if (show) {
    return (
      <div className="app">
        <h1>Do It!</h1>
        <p>
          Give yourself two minutes (120s) to finish this task. Then mark it
          done.
        </p>
        <div className="time">
          <h2>{seconds} seconds</h2>
        </div>
        <div className="row">
          {/* TODO: change colors to reflect stop and start */}
          <Button
            color={isActive ? "primary" : "secondary"}
            onClick={timerChange}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          {/* Set item as done or complete */}
          <Button
            className="button"
            onClick={() => {
              categorizeNote(noteId, "done");
              toggle.Timer();
              toggle.Actionable();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Timer;
