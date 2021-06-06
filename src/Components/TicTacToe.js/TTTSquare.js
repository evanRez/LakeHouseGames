import React from "react";
import Paper from "@material-ui/core/Paper";

const TTTSquare = (props) => {
  return (
    <Paper
      elevation={3}
      onClick={props.onClick}
      style={{
        width: "100%",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "2rem",
      }}
    >
      <h1 style={{ color: `${props.value === "X" ? "red" : "blue"}` }}>
        {props.value}
      </h1>
    </Paper>
  );
};

export default TTTSquare;
