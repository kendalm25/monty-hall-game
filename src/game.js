import "./game.css";
import hostImg from "./images/game-show-host.png";
import doorImg from "./images/door-image.png";
import goatImg from "./images/goat-image.png";
import carImg from "./images/car-image.png";
import React from "react";
import { useEffect, useState, button } from "react";

function Game() {
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);
  const [numOfGames, setNumOfGames] = useState(1);
  const [isDoorClickable, setIsDoorClickable] = useState(true);
  const [winningDoor, setWinningDoor] = useState(null);
  //const [chosenDoor, setChosenDoor] = useState(null);
  const [displaySelect, setDisplaySelect] = useState("Please Select A Door");
  const [revealText, setRevealText] = useState("");
  const [showReveal, setShowReveal] = useState(false);
  const [revealedDoor, setRevealedDoor] = useState(null);
  const [displayButtons, setDisplayButtons] = useState(false);
  let showDoor = 0;

  // grab proper id of the door selected
  const doorPressed = (e) => {
    if (isDoorClickable) {
      const selectedDoor = e.currentTarget.id;
      //setChosenDoor(selectedDoor);
      setDisplaySelect(" You Have Chosen: Door " + selectedDoor);
      e.currentTarget.classList.add("clicked");
      setIsDoorClickable(false);
      showDoor = revealDoor(selectedDoor);
      setShowReveal(true);
      setRevealText(
        "Nice Pick! Well I Can Ensure You That The Car Is Not Under Door " +
          showDoor
      );

      setTimeout(() => {
        setRevealText(
          "Now Comes The Real Question. Would You Like To Stay With Your Original Door or Switch?"
        );
        setDisplayButtons(true);
      }, 5000);
    }
  };

  // randomly choose a number
  const random = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  };

  // randomly choose a door and set that as our winner
  function pickDoorWinner() {
    const winner = random(1, 3);
    setWinningDoor(winner);
    console.log("winning door is: ", winningDoor);
  }

  // based off what umber has been chosen, determine which door is safe to reveal
  function revealDoor(selectedDoor) {
    const doors = [1, 2, 3];
    console.log("doors", doors);
    const chosen = parseInt(selectedDoor);
    const winner = parseInt(winningDoor);
    doors.splice(chosen - 1, 1);

    console.log("chosen door", chosen);
    console.log("winner ", winner);
    console.log("doors without chosen", doors);

    let doorToReveal = null;
    if (doors.includes(winner)) {
      const index = doors.indexOf(winner);
      doors.splice(index, 1);
      doorToReveal = doors[0];
      console.log("final selection pool", doors);
    } else {
      const index = random(0, 1);
      doorToReveal = doors[index];
      console.log("final selection pool", doors);
    }
    setRevealedDoor(doorToReveal);
    return doorToReveal;
  }

  return (
    <div className="container">
      {winningDoor && (
        <div className="game-conatiner">
          <div className="action-input">
            <p className="num-games-text"> Games: {numOfGames} </p>
            <p className="action-text">{displaySelect}</p>
          </div>
          <div className="threeDoors">
            <button id="1" className="door" type="button" onClick={doorPressed}>
              <p className="door-text">DOOR 1</p>
              <img
                src={showDoor === 1 || revealedDoor === 1 ? goatImg : doorImg}
              />
            </button>
            <button id="2" className="door" type="button" onClick={doorPressed}>
              <p className="door-text">DOOR 2</p>
              <img
                src={showDoor === 2 || revealedDoor === 2 ? goatImg : doorImg}
              />
            </button>
            <button id="3" className="door" type="button" onClick={doorPressed}>
              <p className="door-text">DOOR 3</p>
              <img
                src={showDoor === 3 || revealedDoor === 3 ? goatImg : doorImg}
              />
            </button>
          </div>
        </div>
      )}

      {showReveal && (
        <div className="reveal-sec">
          <p className="reveal-text">{revealText}</p>
        </div>
      )}

      {displayButtons && (
        <div className="choose-buttons">
          <button className="stay-button">STAY</button>
          <button className="switch-button">SWITCH</button>
        </div>
      )}

      {/* START button - will disappear after clicking */}
      {!winningDoor && (
        <div className="startContainer">
          <div className="ready">
            <h3 className="readyText">
              For this game, we will be playing 10 rounds. <br /> Are you ready?
            </h3>
          </div>

          <button className="start-btn" onClick={pickDoorWinner}>
            START
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
