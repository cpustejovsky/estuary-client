import React, { useState } from "react";
import NoteDelete from "./NoteDelete";
import NoteEdit from "./NoteEdit";
import { connect, ConnectedProps } from "react-redux";
import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

const mapDispatch = {
  categorizeNote,
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string,
  content: string,
  organize: boolean,
  category: string,
  completedDate: Date,
}

function Note(props: Props) {
  const { categorizeNote, id, content, organize, category, completedDate } = props;
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);
  const toggleEdit = () => setEditShow(!editShow);

  const closeEditView = () => setEditShow(false);
  const renderEdit = (NoteId: string) => {
    if (editShow && NoteId === id) {
      return (
        <NoteEdit
          id={NoteId}
          content={content}
          closeEditView={closeEditView}
        />
      );
    } else {
      return null;
    }
  };

  const toggleDelete = () => setDeleteShow(!deleteShow);
  const renderDelete = (NoteId: string) => {
    if (deleteShow && NoteId === id) {
      return (
        <NoteDelete
          style={{ marginRight: "20px" }}
          id={NoteId}
          toggleDelete={toggleDelete}
        />
      );
    } else {
      return null;
    }
  };
  const renderButtons = () => {
    if (organize) return null;
    switch (category) {
      case "maybe" || "referense":
        return (
          <>
            <Button
              onClick={() => {
                categorizeNote(id, "in-tray");
              }}
              className="click"
            >
              Move to In-Tray
            </Button>
            <Button onClick={() => toggleEdit()} className="click">
              Edit
            </Button>
            <Button onClick={() => toggleDelete()} className="red-text click">
              Delete
            </Button>
          </>
        );
      case "done":
        return (
          <p>
            Completed on:{" "}
            {completedDate
              ? new Date(completedDate).toLocaleString()
              : "N/A"}
          </p>
        );
      default:
        return (
          <>
            <Button
              onClick={() => {
                categorizeNote(id, "done");
              }}
            >
              Complete
            </Button>
            <Button onClick={() => toggleEdit()} className="click">
              Edit
            </Button>
            <Button onClick={() => toggleDelete()}>Delete</Button>
          </>
        );
    }
  };
  return (
    <Card raised key={id} className="margin-top notes">
      <CardContent>
        <p>{!editShow ? content : null}</p>
        {renderEdit(id)}
      </CardContent>
      <CardActions>{renderButtons()}</CardActions>
      {renderDelete(id)}
    </Card>
  );
}

export default connector(Note);
