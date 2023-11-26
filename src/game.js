import "./game.css";
import doorImg from "./images/door-image.png";
import goatImg from "./images/goat-image.png";
import carImg from "./images/car-image.png";
import proof from "./images/monty-hall-proof.png";
import React from "react";
import TrialData from "./trialData";
import Simulations from "./simulations";
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
  const [displayResultsButton, setDisplayResultsButton] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
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
      setRevealText("The Car Is Not Under Door " + showDoor);

      // after a few seconds, give them some time to select an option (stay or switch)
      setTimeout(() => {
        setRevealText(
          "Would You Like To Stay With Your Original Door or Switch?"
        );
        setDisplayButtons(true);
      }, 2000);
    }
  };

  // randomly choose a number
  const random = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
  };

  // randomly choose a door and set that as our winner
  const pickDoorWinner = () => {
    const winner = random(1, 3);
    setWinningDoor(winner);
  };

  // based off what umber has been chosen, determine which door is safe to reveal
  const revealDoor = (selectedDoor) => {
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
  };

  // find which door which has not been revelaed/selected yet
  const findRemainingDoor = () => {
    const doors = [1, 2, 3];
    const indexChosen = doors.indexOf(parseInt(chosenDoor));
    doors.splice(indexChosen, 1);
    const indexRevealed = doors.indexOf(revealedDoor);
    doors.splice(indexRevealed, 1);
    return doors[0];
  };

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

    if (numOfGames === 10) {
      setDisplayResultsButton(true);
    }
  };

  // update states so that user can play another round
  const reset = () => {
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
  };

  const showResults = () => {
    console.log("wins: ", wins, "losses: ", loss);
    setDisplayResults(true);
    setDisplayResultsButton(false);
    setDisplayLoss(false);
    setDisplayWin(false);
  };

  return (
    <div className="container">
      {/* start button disappears after clicking */}
      {!winningDoor && (
        <div className="startContainer">
          <div className="ready">
            <p className="readyText">
              For this game, we will be playing 10 rounds. <br /> Are you ready?
            </p>
          </div>

          <button className="start-btn" onClick={pickDoorWinner}>
            START
          </button>
        </div>
      )}
      {/* if game has started, display game and door images */}
      {winningDoor && (
        <div className="game-conatiner">
          <div className="action-input">
            <p className="num-games-text"> Round: {numOfGames} </p>
            <p className="action-text">{displaySelect}</p>
            <p className="blank-spot"> {""} </p>
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

      {/* dispaly results round button  */}
      {displayResultsButton && (
        <button className="resultsButton" onClick={showResults}>
          RESULTS
        </button>
      )}

      {/* dispaly graph results  */}
      {displayResults && (
        <section className="roundsData">
          <p className="roundsDataText">
            {" "}
            Here are the results of your 10 rounds:{" "}
          </p>
          <TrialData
            wins={wins}
            loss={loss}
            stays={stays}
            switches={switches}
          />

          <p className="trialQuestion">
            Wow, not too shabby at all. Well...what was your strategy? Most
            likely there wasn't one and you just chose whichever button spoke to
            you in the moment. For those who took CS109 you probably had a
            strategy as you already know what's optimal, but me (a television
            host) who has never taken CS109, I have no clue.
            <br />
            <br />
            So I must ask...what is the best strategy? <br /> <br />
            Should we always switch? Should we always stay? Is random our best
            bet? <br /> <br />
            Well let's try it out!
          </p>
          <p className="simulateTrials">
            {" "}
            Let's see what happens if we run 10 rounds again, but try a
            different strategy every time. The first trial we always switch to
            the other door, the second trial we always stay with our original
            door, and the third trial, what we decide to do will be completely
            random. <br /> <br /> Lets look at the results below:
          </p>
          <Simulations trials={10} />

          <p className="simulateTrials">
            {" "}
            Hmmmm interesting. But before we come to any conclusions, let's
            actually run the trials again, but this time <b>100</b> times each.
          </p>
          <Simulations trials={100} />

          <p className="simulateTrials">
            {" "}
            Wow, it seems like always switching results in a lot more wins than
            either choosing to always stay or choose randomly. But to be really
            REALLY sure, let's run it <b>1000</b> times!
          </p>

          <Simulations trials={1000} />
          <p className="simulateTrials">
            {" "}
            Now I am pretty confident that always switching appears to be the
            strategy if you are trying to win as many games as possible. But why
            is this? <br /> <br />
          </p>
          <h3 className="debriefTitle"> DISCUSSION </h3>
          <p className="debrief">
            You have probably noticed by now but this game is the Monty Hall
            Problem. Which is a famous probability puzzle that albeit seeming
            very simple on the surface, can be hard to truly grasp.
          </p>
          <h4 className="backgroundTitle"> BACKGROUND </h4>
          <p className="background">
            The Monty Hall problem is named after Monty Hall, the{" "}
            <i> Let's Make A Deal </i> host from 1963-1986. One of the most
            popular games on this show, was THIS problem where contetsants,
            similarly to you, were given the option of three doors to choose
            from. One door had an amazing prize, and the other two did not. They
            would choose a door, the host would reveal a door without the
            amazing prize, and the contestant had to decide if they wanted to
            stay with their original door or switch to the remaining door.
          </p>
          <h4 className="backgroundTitle"> WHY YOU SHOULD ALWAYS SWITCH </h4>
          <p className="background">
            The reason you should always switch comes down to...you guessed it,
            probability. The likelihood of you winning the car if you stay is
            1/3 compared to swicthing which is 2/3. Why? Let's break it down.{" "}
            <br />
            <br />
            When you initially choose a door, you have a 1/3 chance of picking
            the car and 2/3 chance of picking a goat. We know from the host's
            responsibilities that they will ALWAYS reveal a door with a goat
            behind it. Now by switching to the other door, the likelihood of you
            winning a goat has increased to 2/3 becasue IF your original door
            had a goat behind it, by switching, you are guaranteed the car,
            however staying with your orginal door is staying with the original
            probability of 1/3 chance of winning a car. <br />
            <br />
            This may still sound a little confusing but if we put it like this:
            You choose one door and by switching to the other door is the
            eqivalent of "if the car is behind either of these two doors, I
            win", might help it out a bit. But knowing you all are CS109
            students, let's break it down in terms you will understand.
          </p>
          <p className="backgroundTitle"> CONDITIONAL PROBABILITY</p>
          <p className="background">
            Many people struggle to understand why, once the host reveals a door
            with a goat, the probability of winning becomes 2/3 when switching,
            rather than 1/2 or staying with the original proabbility of 1/3. We
            can actually explain this phenomenon using Bayes' Theorem. <br />{" "}
            <br /> See the proof I have written below:
            <img className="proof-image" src={proof} />
          </p>
          <h4 className="backgroundTitle"> CONCLUSION</h4>
          <p className="background">
            In conclusion, the Monty Hall problem is a fascinating demonstration
            of probability that often defies our intuition. Through these 10
            rounds, you've experienced firsthand how switching doors increases
            your chances of winning. The statistics don't lie: the strategy of
            always switching yields a higher probability of success. Remember,
            in situations where uncertainty reigns, embracing the logic of
            probability can lead to unexpected but advantageous outcomes. So,
            whether it's doors, decisions, or opportunities in life, sometimes
            it pays to make the switch!
          </p>
        </section>
      )}
    </div>
  );
}

export default Game;
