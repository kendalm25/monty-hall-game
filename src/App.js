import "./App.css";
import hostImg from "./images/game-show-host.png";
import doorImg from "./images/door-image.png";
import React from "react";
import { useEffect, useState, button } from "react";

export default function App() {
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);

  const doorPressed = (e) => {
    const id = e.currentTarget.id;
    console.log("id is: ", id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="congrats-text"> CONGRATULATIONS!!! </h2>
        <p className="selected-text">
          You have been selected to be a contestant on a very new game show.
        </p>
      </header>
      <section className="intstructions">
        <img className="host-image" src={hostImg} />
        <div className="instruct-text-box">
          <p className="instructions-text">
            Welcome to the thrilling game of chance, where luck and strategy
            collide in the Monty Hall Challenge! Here's how it goes: Behind
            three magnificent doors lies a wonderful surprise. Two doors hide
            adorable goats, and one door conceals a brand-new, shiny car. Your
            mission? To snag that luxurious car for yourself! To kick things
            off, you'll select one door, any door that calls out to you. Once
            you've made your choice, hold tight! We'll swing one of the
            remaining doors wide open to reveal a goat. Yes, one of those pesky
            goats will make an appearance, leaving your chosen door and the
            other unopened door in play. Now comes the ultimate decision-making
            moment! You have the opportunity to stick with your original pick or
            opt for the other remaining closed door. The question is, should you
            stay or should you switch?
          </p>
        </div>
      </section>
      <section className="game">
        <div className="ready">
          <h3 className="readyText">Are You Ready?</h3>
        </div>
        <div className="threeDoors">
          <button id="1" className="door" type="button" onClick={doorPressed}>
            <img src={doorImg} alt="door 1" className="doorPic" />
          </button>
          <button id="2" className="door" type="button" onClick={doorPressed}>
            <img src={doorImg} alt="door 2" className="doorPic" />
          </button>
          <button id="3" className="door" type="button" onClick={doorPressed}>
            <img src={doorImg} alt="door 3" className="doorPic" />
          </button>
        </div>
      </section>
      <div className="credits">
        <p className="credit-text"> Kendal Murray • CS109 Challenge</p>
      </div>
    </div>
  );
}
