import React, { useState } from "react";

const bottomOut = (i) => {
  // const board = state.board.slice();
  if (!i.isFilled && !(i[0].charCodeAt(0) - 1).isFilled) {
    console.log("something");
  } else {
    console.log("changed");
  }
  console.log("cant find board id");
  // console.log(isFilled ? "true" : "false");
  // console.log(i[0].charCodeAt(0) - 1);
};

const FourCoin = (props) => {
  return (
    <div
      style={{
        minHeight: "25px",
        minWidth: "25px",
        color: "red",
      }}
      onClick={() => bottomOut(props.cellVal)}
      isFilled={props.isFilled}
    >
      Cell
    </div>
  );
};

export default FourCoin;
