import React, { useState } from "react";
import ProjectDelete from "./ProjectDelete";
import ProjectNew from "./ProjectNew";
import { connect, ConnectedProps } from "react-redux";
import { completeProject } from "../../actions";
import Note from "../notes/Note";
// import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import { AppState } from "../../models/"

const mapDispatch = {
  completeProject
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string,
  title: string,
  description: string,
  dueDate: Date,
  history: any,
  complete: boolean,
  notes: AppState["notes"]
}

function Project(props: Props) {
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);

  const toggleEdit = () => {
    setEditShow(!editShow);
    closeDeleteView();
  };

  const closeEditView = () => setEditShow(false);
  const closeDeleteView = () => setDeleteShow(false);
  const renderEdit = (editShow: boolean, id: string) => {
    if (editShow) {
      const project = {
        title: props.title,
        description: props.description,
        dueDate: props.dueDate,
        id: id,
      };
      return (
        <ProjectNew
          show
          edit={true}
          project={project}
          id={id}
          toggleEdit={toggleEdit}
          toggle={false}
        />
      );
    } else {
      return null;
    }
  };
  const toggleDelete = () => {
    setDeleteShow(!deleteShow);
    closeEditView();
  };

  const renderDelete = (deleteShow: boolean, id: string) => {
    if (deleteShow && id === props.id) {
      return (
        <ProjectDelete
          history={props.history}
          id={props.id}
          toggleDelete={toggleDelete}
        />
      );
    } else {
      return null;
    }
  };
  const renderButtons = () => {
    if (props.complete !== null && props.complete !== undefined) {
      return null;
    } else {
      return (
        <>
          <Button onClick={() => toggleEdit()} className="click">
            Edit
          </Button>
          <Button onClick={() => toggleDelete()} className="click">
            Delete
          </Button>
          <Button
            onClick={() => {
              props.completeProject(props.id);
              props.history.push("/projects/list/done");
            }}
          >
            Done
          </Button>
        </>
      );
    }
  };
  const renderNotes = () => {
    return props.notes.map((note) => {
      return (
        <Note
          category={note.Category}
          content={note.Content}
          id={note.ID}
          project={true}
          organize={false}
          completedDate={null}
        />
      );
    });
  };
  const renderContent = () => {
    return (
      <>
        {" "}
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <hr />
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(props.dueDate).toLocaleDateString()}
        </p>
      </>
    );
  };
  return (
    <Card raised key={props.id} className="margin-top padding-horizontal">
      <CardContent>
        <CardActions>{renderButtons()}</CardActions>
        {renderDelete(deleteShow, props.id)}
        {!editShow ? renderContent() : null}
        {renderEdit(editShow, props.id)}
        <hr />
        <h4>Notes</h4>
        {renderNotes()}
      </CardContent>
    </Card>
  );
}

export default connector(Project);
