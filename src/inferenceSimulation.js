import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const InferenceSimulations = ({ trials }) => {
  const chartRef = useRef(null);
  let myChart = null;

  // logic: if the car is behind the door they didn't initially choose, they win
  function alwaysSwitch(trials) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      const doors = [1, 2, 3];
      const winner = doors[Math.floor(Math.random() * doors.length)];
      const choice = doors[Math.floor(Math.random() * doors.length)];
      doors.splice(doors.indexOf(choice), 1);
      if (doors.includes(winner)) {
        wins++;
      }
    }
    return wins;
  }

  const switches = alwaysSwitch(trials);
  const stays = 10000 - switches;

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
              label: "Number of Times Switches Won",
              data: [switches],
              backgroundColor: "rgba(240,128,128, 0.7)",
            },
            {
              label: "Number of Times Staying Won",
              data: [stays],
              backgroundColor: "rgba(54, 162, 235, 0.7)",
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

export default InferenceSimulations;
