import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import Game from "./game";

const TrialData = ({ wins, loss, stays, switches }) => {
  const chartRef = useRef(null);
  let myChart = null;

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
          labels: ["Wins", "Losses", "Switches", "Stays"],
          datasets: [
            {
              data: [wins, loss, switches, stays],
              backgroundColor: [
                "rgba(240,128,128, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255,140,0, 0.7)",
                "rgba(144,238,144, 0.7)",
              ],
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
              display: false,
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

export default TrialData;
