import React from "react";
import Note from "../../Note";
import { Note as NoteType } from "../../../../models"
import { History } from "history"
import _ from "lodash";

type Notes = NoteType[];


export function mapInTrayArray(notes: Notes, history: any) {
  if (!_.isEmpty(notes)) {
    return notes
      .reverse()
      .map(({ Content, ID, Tags, Category, CompletedDate }) => {
        return {
          ID: ID,
          history,
          Content,
          Tags,
          Category,
          CompletedDate
        };
      }).filter((note) => note?.Category === "in-tray");
  } else {
    return [{
      ID: "",
      history,
      Content: "",
      Tags: [],
      Category: "empty",
      CompletedDate: new Date()
    }]
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
          // tags={note.Tags}
          category={note.Category}
          organize={true}
          completedDate={note.CompletedDate}
          project={false}
        />);
      } else {
        return null;
      }
    })[0];
  }
}
