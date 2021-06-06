import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import FourCoin from "./FourCoin";

const FourBoard = () => {
  const [state, setState] = useState({
    board: new Array(6).fill(new Array(7).fill(0).map((_, i) => i + 1)),
    redIsNext: true,
  });

  const [isFilled, setIsFilled] = useState(false);

  // const handleClick = (i) => {
  //   const squares = state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = state.xIsNext ? "X" : "O";
  //   setState({
  //     squares: squares,
  //     xIsNext: !state.xIsNext,
  //   });
  //   console.log(squares);
  //   console.log(squares[i]);
  // };

  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        {console.log(state.board)}
        {/* {state.board.map((row, ind) => {
          // console.log(String.fromCharCode(ind + 65));
          return (
            <Grid
              container
              spacing={3}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              id={String.fromCharCode(ind + 65)}
            >
              {row.map((cell, idx) => {
                // console.log(idx);
                // console.log(`${String.fromCharCode(ind + 65)}${idx}`);
                return (
                  <Grid item>
                    <FourCoin
                      cellVal={`${String.fromCharCode(ind + 65)}${idx}`}
                      isFilled={isFilled}
                    />
                  </Grid>
                );
              })}
            </Grid>
          );
        })} */}
      </div>
    </div>
  );
};

export default FourBoard;

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

// () =>
//                         alert(
//                           `${String.fromCharCode(
//                             ind + 65
//                           )}${idx} : ${"B".charCodeAt(0)}`
//                         )

{
  /* <button
                      onClick={() =>
                        bottomOut(`${String.fromCharCode(ind + 65)}${idx}`)
                      }
                    >
                      Cell
                    </button> */
}

// const bottomOut = (i) => {
//   // const board = state.board.slice();
//   if (!i.isFilled && !(i[0].charCodeAt(0) - 1).isFilled) {
//     console.log("something");
//   } else {
//     console.log("changed");
//   }
//   console.log(state.board.id || "cant find board id");
//   // console.log(isFilled ? "true" : "false");
//   // console.log(i[0].charCodeAt(0) - 1);
// };
