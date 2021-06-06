import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TTTSquare from "./TTTSquare";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import "./TTTstyles.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    padding: "15px 20px",
    outline: "0",
  },
}));

const Board = () => {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    resetGame();
  };

  const classes = useStyles();

  const sqID = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(state.squares);

  let status;

  if (winner) {
    status = "";
  } else {
    status = `${state.xIsNext ? "X" : "O"}`;
  }

  const resetGame = () => {
    setState({
      squares: Array(9).fill(null),
      xIsNext: state.xIsNext,
    });
  };

  useEffect(() => {
    if (winner) {
      const handleOpen = () => {
        setShowModal(true);
      };
      handleOpen();
    }
  }, [winner]);

  return (
    <div className="tictacboard">
      <Modal
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="right" in={showModal} mountOnEnter unmountOnExit>
          <Paper className={classes.modalBody}>
            <Typography variant="h4" style={{ textTransform: "uppercase" }}>
              Player{" "}
              <span style={{ color: `${winner === "X" ? "red" : "blue"}` }}>
                {winner}
              </span>{" "}
              Has Won the Game!
            </Typography>
          </Paper>
        </Slide>
      </Modal>

      <Typography style={{ color: "#fff" }} variant="h2">
        <span style={{ color: `${state.xIsNext ? "red" : "blue"}` }}>
          {status}
        </span>{" "}
        is next
      </Typography>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "40px",
        }}
      >
        <Grid
          container
          spacing={1}
          style={{
            maxWidth: "600px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {sqID.map((i) => {
            return (
              <Grid item xs={4} key={sqID[i]}>
                <TTTSquare
                  onClick={() => handleClick(i)}
                  value={state.squares[i]}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Button variant="contained" color="secondary" onClick={() => resetGame()}>
        Reset Game
      </Button>
    </div>
  );
};

export default Board;
