import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import CachedIcon from "@material-ui/icons/Cached";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customBtn: {
    backgroundColor: "#61d37f",
    borderColor: "#61d37f",
    marginBottom: "12px",
    padding: "12px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#27a151",
      borderColor: "#27a151",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#95ffaf",
      borderColor: "#95ffaf",
    },
  },
}));

const diceRoll = () => Math.floor(Math.random() * 6 + 1);

const PigDice = () => {
  const [state, setState] = useState({
    player1Score: 0,
    player2Score: 0,
    p1IsNext: true,
    gameState: "ongoing",
    currentRollScore: 0,
  });

  const classes = useStyles();

  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);

  const { player1Score, player2Score } = state;

  useEffect(() => {
    //Check winning score

    const checkWinningScore = () => {
      if (player1Score >= 100 || player2Score >= 100) {
        setState({
          gameState: `${
            player1Score >= 100 ? "Player 1 Wins!" : "Player 2 Wins!"
          }`,
          currentRollScore: 0,
        });
      }
    };

    checkWinningScore();
  }, [player1Score, player2Score]);

  const showEndingCredit = () => {
    if (
      state.gameState === "Player 1 Wins!" ||
      state.gameState === "Player 2 Wins!"
    )
      return <div>{state.gameState}</div>;
  };

  const handleClick = () => {
    if (
      state.gameState === "Player 1 Wins!" ||
      state.gameState === "Player 2 Wins!"
    )
      return;
    //fix this
    rollDice();
    if (dice1 === 1 || dice2 === 1) {
      handleEndTurn();
    } else {
      setState({
        ...state,
        currentRollScore: dice1 + dice2 + state.currentRollScore,
      });
    }
  };

  const rollDice = () => {
    setDice1(diceRoll());
    setDice2(diceRoll());
    const callNewState = () =>
      setState({ ...state, currentRollScore: dice1 + dice2 });
    callNewState();
  };

  const handleEndTurn = () => {
    setDice1(0);
    setDice2(0);
    setState({
      player1Score: state.p1IsNext
        ? state.player1Score + checkDice()
        : state.player1Score,
      player2Score: state.p1IsNext
        ? state.player2Score
        : state.player2Score + checkDice(),
      p1IsNext: !state.p1IsNext,
      gameState: "ongoing",
      currentRollScore: 0,
    });
  };

  const checkDice = () => {
    return dice1 === 1 || dice2 === 1
      ? 0
      : state.currentRollScore + dice1 + dice2;
  };

  const resetPigDice = () => {
    setState({
      player1Score: 0,
      player2Score: 0,
      p1IsNext: state.p1IsNext,
      gameState: "ongoing",
      currentRollScore: 0,
    });
  };

  return (
    <BodyDiv>
      <Container
        style={{
          padding: "64px 50px",
          minWidth: "650px",
        }}
      >
        <Paper>
          <Typography
            variant="h4"
            gutterBottom
            style={{ paddingTop: "30px", textTransform: "uppercase" }}
          >
            Greedy Dice
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            style={{ textTransform: "uppercase" }}
          >
            first one to reach 100 wins, but be careful, if you roll a 1 on
            either die, you forfeit your turn!
          </Typography>
          <Button
            onClick={() => resetPigDice()}
            size="large"
            className={classes.customBtn}
            startIcon={<AddCircleOutlineIcon style={{ color: "#fff" }} />}
          >
            New Game
          </Button>
          <CurrentDiceSum>
            {state.gameState === "ongoing"
              ? dice1 === 1 || dice2 === 1
                ? 0
                : state.currentRollScore + dice1 + dice2
              : "Game Over"}
          </CurrentDiceSum>
          <Typography variant="h4" gutterBottom color="secondary">
            {showEndingCredit()}
          </Typography>

          <div>
            <div
              style={{
                width: "50%",
                float: "left",
                height: "300px",
                backgroundColor: `${state.p1IsNext ? "#f5f7f5" : "white"}`,
              }}
            >
              <PlayerTitle>player 1</PlayerTitle>
              <PlayerScore>{state.player1Score}</PlayerScore>
            </div>
            <div
              style={{
                width: "50%",
                float: "left",
                height: "300px",
                backgroundColor: `${!state.p1IsNext ? "#f5f7f5" : "white"}`,
              }}
            >
              <PlayerTitle>player 2</PlayerTitle>
              <PlayerScore>{state.player2Score}</PlayerScore>
            </div>
          </div>
          {dice1 !== 0 ? (
            <div>
              <DiceDiv
                src={`diceImg/dice-${dice1}.svg`}
                alt="dice one"
                style={{ left: "calc(50% - 110px", margin: "10px" }}
              />

              <DiceDiv
                src={`diceImg/dice-${dice2}.svg`}
                alt="dice two"
                style={{ left: "50%", margin: "10px" }}
              />
            </div>
          ) : (
            <div />
          )}
          <HoldAndRollContainer>
            <Button
              onClick={() => handleClick()}
              className={classes.customBtn}
              startIcon={<CachedIcon style={{ color: "#fff" }} />}
            >
              Roll dice
            </Button>
            <Button
              onClick={() => handleEndTurn()}
              className={classes.customBtn}
              startIcon={<MoveToInboxIcon style={{ color: "#fff" }} />}
            >
              Hold
            </Button>
          </HoldAndRollContainer>
        </Paper>
      </Container>
    </BodyDiv>
  );
};

export default PigDice;

/*
weird style things
style={{ width: "42%" }}
style={{ display: "flex" }}
style={{ width: "40%" }}
style={{ width: "40%" }}
*/

const PlayerTitle = styled.div`
  font-size: 40px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
`;

const PlayerScore = styled.div`
  text-align: center;
  font-size: 80px;
  font-weight: 100;
  color: rgb(97 211 127);
  margin-bottom: 130px;
`;

const CurrentDiceSum = styled.div`
  background-color: #f5f7f5;
  color: black;
  font-size: 2rem;
  width: 40%;
  margin: 0 auto;
  padding: 12px;
  text-align: center;
  border-radius: 7px;
  margin-bottom: 12px;
`;

const DiceDiv = styled.img`
  position: absolute;
  /* left: 40%; */
  top: 70vh;
  height: 90px;
  max-width: 90px;
  border: none;
  margin: 10px;
  box-shadow: 0px 10px 60px rgb(0 0 0 / 10%);
  transition: transform 1s ease-in-out;
`;

const HoldAndRollContainer = styled.div`
  padding: 30px 10px 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
`;

const BodyDiv = styled.div`
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url(spaceSky.jpeg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: block;
`;
