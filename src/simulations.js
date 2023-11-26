import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import Game from "./game";

const Simulations = ({ trials }) => {
  const chartRef = useRef(null);
  let myChart = null;

  function alwaysSwitch(trials) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      const doors = [1, 2, 3];
      const winner = doors[Math.floor(Math.random() * doors.length)]; // door 1
      const choice = doors[Math.floor(Math.random() * doors.length)]; // door 2
      doors.splice(doors.indexOf(choice), 1);
      if (doors.includes(winner)) {
        wins++;
      }
    }
    return wins;
  }

  function alwaysStay(trials) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      const doors = [1, 2, 3];
      const winner = doors[Math.floor(Math.random() * doors.length)]; // door 1
      const choice = doors[Math.floor(Math.random() * doors.length)]; // door 2
      if (choice === winner) {
        wins++;
      }
    }
    return wins;
  }

  function chooseRandomly(trials) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      const switchDoor = Math.random() < 0.5;
      if (switchDoor) {
        wins += alwaysSwitch(1);
      } else {
        wins += alwaysStay(1);
      }
    }
    return wins;
  }

  const switches = alwaysSwitch(trials);
  const stays = alwaysStay(trials);
  const random = chooseRandomly(trials);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (myChart) {
        // If chart instance exists, destroy it before creating a new one
        myChart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Number Of Wins"],
          datasets: [
            {
              label: "Always Switch",
              data: [switches],
              backgroundColor: "rgba(240,128,128, 0.7)",
            },
            {
              label: "Always Stay",
              data: [stays],
              backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
              label: "Choose Randomly",
              data: [random],
              backgroundColor: "rgba(255,140,0, 0.7)",
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              beginAtZero: true,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          aspectRatio: 2,
        },
      });
    }

    return () => {
      // Clean up: Ensure the chart is destroyed when the component unmounts
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default Simulations;
