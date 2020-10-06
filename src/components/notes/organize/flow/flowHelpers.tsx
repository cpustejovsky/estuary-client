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
      .map(({ content, id, tags, category }) => {
        if (category === "in-tray") {
          return {
            id: id,
            history,
            content,
            tags,
            category,
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
      if (note.category === "in-tray") {
        return (<Note
            key={note.id}
            id={note.id}
            content={note.content}
            // tags={note.tags}
            category={note.category}
            organize={true}
            completedDate={note.completedDate}
          />);
      } else {
        return null;
      }
    })[0];
  }
}
