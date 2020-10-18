import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  fetchNotesByCategory,
  categorizeNote,
  deleteNote,
  fetchProjects,
} from "../../../../actions";
import { mapInTrayArray, renderNote } from "./flowHelpers";
import Loader from "../../../partials/Loader";
import Actionable from "../Actionable";
import NotActionable from "../NotActionable";
import TwoMinutes from "../TwoMinutes";
import Timer from "../Timer";
import NextAction from "../NextAction";
import ProjectNew from "../../../projects/ProjectNew";
import NoteForProject from "../NoteForProject";
import Calendar from "../Calendar";
import {
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Button,
} from "@material-ui/core";


import { AppState } from "../../../../models/"

const mapState = (state: AppState) => ({
  notes: Object.values(state.notes),
  projects: Object.values(state.projects),
  user: state.user
})
const mapDispatch = {
  fetchNotesByCategory,
  categorizeNote,
  deleteNote,
  fetchProjects,
}

const connector = connect(mapState, mapDispatch)


export type Toggle = {
  Advanced: () => void;
  Actionable: () => void;
  NotActionable: () => void;
  TwoMinutes: () => void;
  Timer: () => void;
  NextAction: () => void;
  ProjectNew: () => void;
  NoteForProject: () => void;
  Calendar: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  history: any

}


const NotesOrganize = (props: Props) => {
  const {
    fetchNotesByCategory,
    fetchProjects,
    deleteNote,
    categorizeNote,
    history,
    notes,
    projects,
    user
  } = props

  useEffect(() => {
    fetchNotesByCategory("in-tray");
    fetchProjects();
  }, [fetchNotesByCategory, fetchProjects]);

  const inTrayArray = mapInTrayArray(notes, history);
  let note =
    inTrayArray && inTrayArray[0] !== undefined ? inTrayArray[0] : null;
  let noteId: string = note && note !== null ? note.ID : "";

  const [advanced, setAdvanced] = useState<boolean>(false);
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);
  const [twoMinutesShow, setTwoMinutesShow] = useState(false);
  const [timerShow, setTimerShow] = useState(false);
  const [nextActionShow, setNextActionShow] = useState(false);
  const [projectNewShow, setProjectNewShow] = useState(false);
  const [noteForProjectShow, setNoteForProjectShow] = useState(false);
  const [calendarShow, setCalendarShow] = useState(false);

  const toggle: Toggle = {
    Advanced() {
      if (advanced === null) {
        setAdvanced(!user.AdvancedView);
      } else {
        setAdvanced(!advanced);
      }
    },
    Actionable() {
      setActionableShow(!actionableShow);
    },
    NotActionable() {
      setNotActionableShow(!notActionableShow);
    },
    TwoMinutes() {
      setTwoMinutesShow(!twoMinutesShow);
    },
    Timer() {
      setTimerShow(!timerShow);
    },
    NextAction() {
      setNextActionShow(!nextActionShow);
    },
    ProjectNew() {
      setProjectNewShow(!projectNewShow);
    },
    NoteForProject() {
      setNoteForProjectShow(!noteForProjectShow);
    },
    Calendar() {
      setCalendarShow(!calendarShow);
    },
  };
  const renderOranizeFlow = () => {
    if (advanced === null ? user.advancedView : advanced) {
      return (
        <>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              width: "400px",
              justifyContent: "center",
              flex: "1 1 auto",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                if (note && note.ID) {
                  categorizeNote(note.ID, "next")
                }
              }}
            >
              Next Action
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setTimerShow(true);
                setProjectNewShow(false);
                setNoteForProjectShow(false);
              }}
            >
              Two Minutes
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                toggle.ProjectNew();
                setNoteForProjectShow(false);
                setTimerShow(false);
              }}
            >
              Project
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                toggle.NoteForProject();
                setProjectNewShow(false);
                setTimerShow(false);
              }}
            >
              Part of Project
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                if (note && note.ID) {
                  categorizeNote(note.ID, "waiting")
                }
              }}            >
              Waiting
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                if (note && note.ID) {
                  categorizeNote(note.ID, "reference")
                }
              }}            >
              Reference
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                if (note && note.ID) {
                  deleteNote(note.ID)
                }
              }}            >
              Trash
            </Button>
          </div>
          <Grid>
            <Timer
              show={timerShow}
              categorizeNote={categorizeNote}
              noteId={noteId}
              toggle={toggle}
            />
            <ProjectNew
              show={projectNewShow}
              deleteNote={deleteNote}
              note={note}
              toggle={toggle}
            />
            <NoteForProject
              projects={projects}
              show={noteForProjectShow}
              categorizeNote={categorizeNote}
              noteId={noteId}
              toggle={toggle}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Actionable show={actionableShow} toggle={toggle} />
          <NotActionable
            show={notActionableShow}
            categorizeNote={categorizeNote}
            deleteNote={deleteNote}
            noteId={noteId}
            toggle={toggle}
          />
          <Calendar
            show={calendarShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            note={note}
            deleteNote={deleteNote}
            toggle={toggle}
          />
          <TwoMinutes
            show={twoMinutesShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
          <Timer
            show={timerShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
          <NextAction show={nextActionShow} toggle={toggle} />
          <ProjectNew
            show={projectNewShow}
            deleteNote={deleteNote}
            note={note}
            toggle={toggle}
          />
          <NoteForProject
            projects={projects}
            show={noteForProjectShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
        </>
      );
    }
  };
  if (user) {
    if (inTrayArray && inTrayArray[0] !== undefined) {
      return (
        <Grid
          justify="center"
          alignContent="center"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "20px",
            minHeight: "100vh",
            minWidth: "50vw",
          }}
        >
          <Typography variant="h4" align="center">
            Organize Notes
          </Typography>{" "}
          <FormControlLabel
            style={{
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
            control={
              <Switch
                size="small"
                color="primary"
                checked={user.AdvancedView === true ? Boolean(user.advancedView) : advanced}
                onChange={() => {
                  toggle.Advanced();
                  setProjectNewShow(false);
                  setNoteForProjectShow(false);
                  setTimerShow(false);
                }}
              />
            }
            label={"Advanced View"}
          />
          {renderNote(inTrayArray)}
          {renderOranizeFlow()}
        </Grid>
      );
    } else {
      return (
        <div>
          <h1>Congratulations!</h1>
          <h2>You're done organizing</h2>
          <Button component={RouterLink} to="/notes/in-tray">
            Back to Notes
          </Button>
        </div>
      );
    }
  } else if (!user) {
    return <>{history.push("/login")}</>;
  }
  else {
    return <Loader />;
  }
}

export default connector(NotesOrganize);
