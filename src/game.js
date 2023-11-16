import "./game.css";
import hostImg from "./images/game-show-host.png";
import doorImg from "./images/door-image.png";
import goatImg from "./images/goat-image.png";
import carImg from "./images/car-image.png";
import React from "react";
import { useState } from "react";

function Game() {
  const [wins, setWins] = useState(0);
  const [loss, setLoss] = useState(0);
  const [stays, setStays] = useState(0);
  const [switches, setSwitches] = useState(0);
  const [numOfGames, setNumOfGames] = useState(1);
  const [isDoorClickable, setIsDoorClickable] = useState(true);
  const [winningDoor, setWinningDoor] = useState(null);
  const [showWinningDoor, setShowWinningDoor] = useState(false);
  const [chosenDoor, setChosenDoor] = useState(null);
  const [displaySelect, setDisplaySelect] = useState("Please Select A Door");
  const [revealText, setRevealText] = useState("");
  const [showReveal, setShowReveal] = useState(false);
  const [revealedDoor, setRevealedDoor] = useState(null);
  const [displayButtons, setDisplayButtons] = useState(false);
  const [displayWin, setDisplayWin] = useState(false);
  const [displayLoss, setDisplayLoss] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  let showDoor = 0;

  // determine if the image should be a door, goat, or car
  const chooseDoorImage = (doorNumber) => {
    if (showWinningDoor && doorNumber === winningDoor) {
      return carImg;
    } else if (showReveal && revealedDoor === doorNumber) {
      return goatImg;
    } else {
      return doorImg;
    }
  };

  // grab proper id of the door selected
  const doorPressed = (e) => {
    if (isDoorClickable) {
      const selectedDoorId = e.currentTarget.id;
      const selectedDoor = parseInt(selectedDoorId);
      setChosenDoor(selectedDoor);
      setDisplaySelect(" You Have Chosen: Door " + selectedDoor);
      e.currentTarget.style.border = "5px dashed white";
      setIsDoorClickable(false);
      showDoor = revealDoor(selectedDoor);
      setShowReveal(true);
      setRevealText(
        "Nice Pick! Well I Can Ensure You That The Car Is Not Under Door " +
          showDoor
      );

      // after a few seconds, give them some time to select an option (stay or switch)
      setTimeout(() => {
        setRevealText(
          "Now Comes The Real Question. Would You Like To Stay With Your Original Door or Switch?"
        );
        setDisplayButtons(true);
      }, 4000);
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
  }

  // based off what umber has been chosen, determine which door is safe to reveal
  function revealDoor(selectedDoor) {
    const doors = [1, 2, 3];
    const chosen = parseInt(selectedDoor);
    const winner = parseInt(winningDoor);
    doors.splice(chosen - 1, 1);

    let doorToReveal = null;
    if (doors.includes(winner)) {
      const index = doors.indexOf(winner);
      doors.splice(index, 1);
      doorToReveal = doors[0];
    } else {
      const index = random(0, 1);
      doorToReveal = doors[index];
    }
    setRevealedDoor(doorToReveal);
    return doorToReveal;
  }

  // find which door which has not been revelaed/selected yet
  function findRemainingDoor() {
    const doors = [1, 2, 3];
    const indexChosen = doors.indexOf(parseInt(chosenDoor));
    doors.splice(indexChosen, 1);
    const indexRevealed = doors.indexOf(revealedDoor);
    doors.splice(indexRevealed, 1);
    return doors[0];
  }

  const madeChoice = (e) => {
    const decision = e.currentTarget.id;
    let door = chosenDoor;
    // if user switched, make sure to properly select new door and update states
    if (decision === "switched") {
      setSwitches(switches + 1);
      const newRemainingDoor = findRemainingDoor();
      setDisplaySelect(" You Have Chosen: Door " + newRemainingDoor);
      const prevSelected = document.getElementById(chosenDoor);
      prevSelected.style.border = "none";
      const newSelected = document.getElementById(newRemainingDoor);
      newSelected.style.border = " 5px dashed white";
      setChosenDoor(newRemainingDoor);
      door = newRemainingDoor;
      // if user stayed, mark as such
    } else if (decision === "stayed") {
      setStays(stays + 1);
    }
    // determine if the user won or loss and display text accordingly

    if (door === winningDoor) {
      setDisplayWin(true);
      setWins(wins + 1);
    } else {
      setDisplayLoss(true);
      setLoss(loss + 1);
    }
    setShowWinningDoor(true);
    setDisplayButtons(false);
    setRevealText("");
    // if not reached desired number of trials, alow user to play again
    if (numOfGames < 10) {
      setPlayAgain(true);
    }
  };

  // update states so that user can play another round
  function reset() {
    setNumOfGames(numOfGames + 1);
    setChosenDoor(null);
    setRevealedDoor(null);
    setWinningDoor(pickDoorWinner);
    setShowWinningDoor(false);
    setIsDoorClickable(true);
    setDisplaySelect("Please Select A Door");
    setRevealText("");
    setShowReveal(false);
    setDisplayButtons(false);
    setDisplayWin(false);
    setDisplayLoss(false);
    setPlayAgain(false);
    document.getElementById(1).style.border = "none";
    document.getElementById(2).style.border = "none";
    document.getElementById(3).style.border = "none";
    console.log("wins: ", wins, "losses: ", loss);
  }

  return (
    <div className="container">
      {/* if game has started, display game and door images */}
      {winningDoor && (
        <div className="game-conatiner">
          <div className="action-input">
            <p className="num-games-text"> Games: {numOfGames} </p>
            <p className="action-text">{displaySelect}</p>
          </div>
          <div className="threeDoors">
            <button id="1" className="door" onClick={doorPressed}>
              <p className="door-text">DOOR 1</p>
              <img className="picture" src={chooseDoorImage(1)} />
            </button>
            <button id="2" className="door" onClick={doorPressed}>
              <p className="door-text">DOOR 2</p>
              <img className="picture" src={chooseDoorImage(2)} />
            </button>
            <button id="3" className="door" onClick={doorPressed}>
              <p className="door-text">DOOR 3</p>
              <img className="picture" src={chooseDoorImage(3)} />
            </button>
          </div>
        </div>
      )}
      {/* dispay text above doors  */}
      {showReveal && (
        <div className="reveal-sec">
          <p className="reveal-text">{revealText}</p>
        </div>
      )}

      {/* display user option buttons (stay or switch)  */}
      {displayButtons && (
        <div className="choose-buttons">
          <button id="stayed" className="stay-button" onClick={madeChoice}>
            STAY
          </button>
          <button id="switched" className="switch-button" onClick={madeChoice}>
            SWITCH
          </button>
        </div>
      )}

      {/* display winner text if user won  */}
      {displayWin && (
        <div className="reveal-sec">
          <p className="reveal-text">
            {" "}
            Congratulations!!! You Just Won A New Car!!!{" "}
          </p>
        </div>
      )}

      {/* display loss text if user lost */}
      {displayLoss && (
        <div className="reveal-sec">
          <p className="reveal-text"> Sorry You Are Stuck With A Goat :/ </p>
        </div>
      )}
      {/* dispaly next round button  */}
      {playAgain && (
        <button className="playAgain" onClick={reset}>
          NEXT ROUND
        </button>
      )}

      {/* start button disappears after clicking */}
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
