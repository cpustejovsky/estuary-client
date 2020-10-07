import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { deleteNote } from "../../actions";
import { Box, Button, CardActions } from "@material-ui/core";
import { green, red, grey } from "@material-ui/core/colors";


const mapDispatch = {
  deleteNote
}

const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string,
  toggleDelete: () => void
}

function NoteDelete(props: Props) {
  return (
    <Box style={{ marginRight: "20px" }}>
      <CardActions>
        <Button disabled style={{ color: grey[500] }}>
          Are you sure?
        </Button>
      </CardActions>
      <CardActions>
        <Button
          style={{ color: green[500] }}
          onClick={() => {
            props.deleteNote(props.id);
            props.toggleDelete();
          }}
          className="click"
        >
          Yes
        </Button>
        <Button
          style={{ color: red[500] }}
          onClick={() => props.toggleDelete()}
          className="click"
        >
          No
        </Button>
      </CardActions>
    </Box>
  );
}

export default connector(NoteDelete);
