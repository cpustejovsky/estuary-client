import React from "react";
import Note from "../../Note";
import {Note as NoteType} from "../../../../models"
import {History} from "history"
import _ from "lodash";

type Notes = NoteType[];


export function mapInTrayArray(notes: Notes, history: History) {
  if (!_.isEmpty(notes)) {
    return notes
      .reverse()
      .map(({ Content, ID, Tags, Category }) => {
        if (Category === "in-tray") {
          return {
            id: ID,
            history,
            Content,
            Tags,
            Category,
          };
        } else {
          return null;
        }
      })
      .filter((note) => note !== null);
  }
}

export function renderNote(noteArr: Notes) {
  if (noteArr && !_.isEmpty(noteArr)) {
    return noteArr.map((note) => {
      if (note.Category === "in-tray") {
        return (<Note
            key={note.ID}
            id={note.ID}
            content={note.Content}
            // tags={note.tags}
            category={note.Category}
            organize={true}
            completedDate={note.CompletedDate}
          />);
      } else {
        return null;
      }
    })[0];
  }
}
