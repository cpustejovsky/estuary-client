import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { Check, CropSquare } from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";


type Props = {
  text: string | JSX.Element,
  complete?: boolean,
  subtodo?: boolean,
  subsubtodo?: boolean
}

const Todo = (props: Props) => {
  const { complete, text, subtodo, subsubtodo } = props;
  if (complete) {
    return (
      <ListItem
        className={
          subtodo
            ? "valign-wrapper subtodo"
            : subsubtodo
            ? "valign-wrapper subsubtodo"
            : "valign-wrapper"
        }
      >
        <Check style={{ color: green[500] }} />
        {text}
      </ListItem>
    );
  } else {
    return (
      <ListItem
        className={
          subtodo
            ? "valign-wrapper subtodo"
            : subsubtodo
            ? "valign-wrapper subsubtodo"
            : "valign-wrapper"
        }
      >
        <CropSquare style={{ color: grey[500] }} />
        {text}
      </ListItem>
    );
  }
};

export default Todo;
