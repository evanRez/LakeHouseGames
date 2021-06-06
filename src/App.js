import "./App.css";
import Board from "./Components/TicTacToe.js/TTTBoard";
import ConFour from "./Components/ConFour/ConFour";
import PigDice from "./Components/PigDice/PigDice";
import Home from "./Components/Home/Home";
import { Switch, Route } from "react-router-dom";
import PersistentDrawerLeft from "./LeftSideDrawer";

let stillConfiguiring = false;

function App() {
  return (
    <div className="App">
      {stillConfiguiring ? (
        <>
          <Board />
          <ConFour />
          <PigDice />
        </>
      ) : (
        <>
          <PersistentDrawerLeft />
          <Switch>
            <Route
              exact
              from="/TicTacToe"
              render={(props) => <Board {...props} />}
            />
            <Route
              exact
              from="/ConnectFour"
              render={(props) => <ConFour {...props} />}
            />
            <Route
              exact
              from="/PigDice"
              render={(props) => <PigDice {...props} />}
            />
            <Route exact from="/" render={(props) => <Home {...props} />} />
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
