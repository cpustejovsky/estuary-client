import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { fetchNotesByCategory } from "../../../actions";
import Loader from "../../partials/Loader.tsx";
import Note from "../Note";
import NotesNew from "../NoteNew";
import renderSubHeader from "./renderSubheader";
function NotesShow({ fetchNotesByCategory, history, match }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  const getNotesLength = (notes) => {
    return notes.length > 0
      ? notes.filter((note) => note.category === match.params.name).length
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
        .map(({ Content, ID, Category }) => {
          return (
            <Note
              key={ID}
              history={history}
              id={ID}
              content={Content}
              // tags={tags}
              category={Category}
              // completedDate={completedDate}
            />
          );
        });
    }
  };
  //TODO: what is a good way to deal with auth redirects?
  if (auth || user) {
    return (
      <div>
        {/* <NoteHeader /> */}
        <div className="site__note">
          {renderSubHeader(notes, match)}
          <hr />
          {match.params.name === "in-tray" ? (
            <NotesNew history={history} />
          ) : null}
          {renderNotes()}
        </div>
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchNotesByCategory })(NotesShow);
