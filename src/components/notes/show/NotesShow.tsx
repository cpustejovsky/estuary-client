import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import _ from "lodash";
import { fetchNotesByCategory } from "../../../actions";
import Loader from "../../partials/Loader";
import Note from "../Note";
import NotesNew from "../NoteNew";
import renderSubHeader from "./renderSubheader";
import { AppState } from "../../../models/"
import { Note as NoteType } from "../../../models"
import { Redirect } from "react-router-dom";

const mapState = (state: AppState) => ({
  auth: state.auth,
  user: state.user,
  notes: Object.values(state.notes)
})
const mapDispatch = {
  fetchNotesByCategory
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  match: any
}


function NotesShow(props: Props) {
  const { fetchNotesByCategory, match, auth, user, notes } = props;
  const getNotesLength = (notes: NoteType[]) => {
    return notes.length > 0
      ? notes.filter((note: NoteType) => note.Category === match.params.name).length
      : 0;
  };
  const notesLength = getNotesLength(notes);
  useEffect(() => {
    fetchNotesByCategory(match.params.name);
  }, [fetchNotesByCategory, match.params.name, notesLength]);
  //TODO: create blur or loading effect while it's loading the other category
  const renderNotes = () => {
    if (!_.isEmpty(notes)) {
      return notes
        .reverse()
        .map(({ Content, ID, Category, CompletedDate }) => {
          return (
            <Note
              key={ID}
              id={ID}
              content={Content}
              category={Category}
              completedDate={CompletedDate}
              organize={false}
            />
          );
        });
    }
  };
  if (auth || user) {
    return (
      <div>
        <div className="site__note">
          {renderSubHeader(notes, match)}
          <hr />
          {match.params.name === "in-tray" ? (
            <NotesNew />
          ) : null}
          {renderNotes()}
        </div>
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else {
    return <Redirect push to="/login" />;
  }
}

export default connector(NotesShow);
