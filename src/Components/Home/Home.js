import React from "react";
import sample from "./LakeLantern.mp4";
import "./Home.css";

const Home = () => {
  return (
    <div className="overlay">
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: "2",
          position: "absolute",
          top: "0",
        }}
      >
        <h1 className="titleFont">Lake House Games</h1>
      </div>
    </div>
  );
};

export default Home;
