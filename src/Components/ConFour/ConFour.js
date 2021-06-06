import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import "./ConFour.css";
import Typography from "@material-ui/core/Typography";

const Player = {
  none: null,
  one: 1,
  two: 2,
  end: 3,
};

const GameState = {
  Ongoing: -1,
  Draw: 0,
  PlayerOneWin: Player.one,
  PlayerTwoWin: Player.two,
};

const initializeBoard = () => {
  const board = [];
  for (let i = 0; i < 42; i++) {
    board.push(Player.none);
  }
  return board;
};

const findLowestEmptyIndex = (board, column) => {
  for (let i = 35 + column; i >= 0; i -= 7) {
    if (board[i] === Player.none) return i;
  }
  return -1;
};

const getGameState = (board) => {
  //check wins horizontal
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c <= 4; c++) {
      const index = r * 7 + c;
      const boardSlice = board.slice(index, index + 4);

      const winningResult = checkWinningSlice(boardSlice);

      if (winningResult !== false) {
        board[index] = 3;
        board[index + 1] = 3;
        board[index + 2] = 3;
        board[index + 3] = 3;
        return winningResult;
      }
    }
  }
  //check wins vertical
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;
      const boardSlice = [
        board[index],
        board[index + 7],
        board[index + 7 * 2],
        board[index + 7 * 3],
      ];

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) {
        board[index] = 3;
        board[index + 7] = 3;
        board[index + 7 * 2] = 3;
        board[index + 7 * 3] = 3;
        return winningResult;
      }
    }
  }
  //check wins  diagonal
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 7; c++) {
      const index = r * 7 + c;

      //check diagonal down-left
      if (c >= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 - 1],
          board[index + 7 * 2 - 2],
          board[index + 7 * 3 - 3],
        ];
        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) {
          board[index] = 3;
          board[index + 7 - 1] = 3;
          board[index + 7 * 2 - 2] = 3;
          board[index + 7 * 3 - 3] = 3;
          return winningResult;
        }
      }
      //check diagonal down-right
      if (c <= 3) {
        const boardSlice = [
          board[index],
          board[index + 7 + 1],
          board[index + 7 * 2 + 2],
          board[index + 7 * 3 + 3],
        ];
        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) {
          board[index] = 3;
          board[index + 7 + 1] = 3;
          board[index + 7 * 2 + 2] = 3;
          board[index + 7 * 3 + 3] = 3;
          return winningResult;
        }
      }
    }
  }

  if (board.some((cell) => cell === Player.none)) {
    return GameState.Ongoing;
  } else {
    return GameState.Draw;
  }
};

const checkWinningSlice = (miniBoard) => {
  if (miniBoard.some((cell) => cell === Player.none)) return false;
  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[1];
  }

  return false;
};

const togglePlayerTurn = (player) => {
  return player === Player.one ? Player.two : Player.one;
};

const getPrettyPlayer = (player) => {
  if (player === Player.none) {
    return "noPlayer";
  }
  if (player === Player.one) {
    return "playerOne";
  }
  if (player === Player.two) {
    return "playerTwo";
  }
  if (player === Player.end) {
    return "playerWinner";
  }
};

const ConFour = () => {
  //App here
  const [state, setState] = useState({
    board: initializeBoard(),
    playerTurn: Player.one,
    gameState: GameState.Ongoing,
  });

  const handleClick = (index) => {
    if (state.gameState !== GameState.Ongoing) return;
    const column = index % 7;
    makeMove(column);
  };

  const showGameStatus = () => {
    let gmstate = state.gameState;
    let text;
    if (gmstate === GameState.Ongoing) {
      text = "Click the board to make a move";
    } else if (gmstate === GameState.Draw) {
      text = "Game is a Draw.";
    } else if (gmstate === GameState.PlayerOneWin) {
      text = "Player 1 has won the game";
    } else if (gmstate === GameState.PlayerTwoWin) {
      text = "Player 2 has won the game";
    }
    return <Typography>{text}</Typography>;
  };

  const makeMove = (column) => {
    const board = state.board;
    const playerTurn = state.playerTurn;

    const index = findLowestEmptyIndex(board, column);

    const newBoard = board.slice();
    newBoard[index] = playerTurn;

    const gameState = getGameState(newBoard);

    setState({
      board: newBoard,
      playerTurn: togglePlayerTurn(playerTurn),
      gameState: gameState,
    });
  };

  const renderCell = (player, index) => {
    return (
      <div
        className="cell"
        key={index}
        onClick={() => handleClick(index)}
        data-player={getPrettyPlayer(player)}
      ></div>
    );
  };

  const renderAllCells = () => {
    const board = state.board;

    return board.map((player, index) => renderCell(player, index));
  };

  const resetConnectFour = () => {
    setState({
      board: initializeBoard(),
      playerTurn: Player.one,
      gameState: GameState.Ongoing,
    });
  };

  return (
    <div className="conFourBody">
      <div className="gameStatus">{showGameStatus()}</div>
      <Container
        style={{
          maxWidth: "583px",
          marginTop: "15px",
          borderRadius: "10px",
          borderColor: "black",
          backgroundColor: "black",
        }}
      >
        <Paper elevation={3} style={{ backgroundColor: "black" }}>
          <div className="board">{renderAllCells()}</div>
        </Paper>
      </Container>
      <div className="resetConFourBtn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => resetConnectFour()}
          style={{
            background: `linear-gradient(
            90deg
            , #E80A89 0%, #F15B2A 100%)`,
          }}
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default ConFour;

// boardSlice.forEach((cell, index) => {
//     if (cell[index] == 1) {
//       return cell[index] + 2;
//     }
//     if (cell[index] == 2) {
//       return cell[index] + 1;
//     } else return 3;
//   });
//   console.log(boardSlice);
