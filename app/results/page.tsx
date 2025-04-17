//maybe helpful once we have data
// labels: labels,
//datasets: [{
//data: values,
//}]

"use client";

import React, { useEffect } from "react";
import {
  Chart,
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
Chart.register(
  ArcElement,
  RadialLinearScale,
  PolarAreaController,
  Tooltip,
  Legend
);

// The value numbers should change once we have results
const rawData = [
  { label: "career1", value: 11, description: "Career 1 description" },
  { label: "career2", value: 16, description: "Career 2 description" },
  { label: "career3", value: 7, description: "Career 3 description" },
  { label: "career4", value: 4, description: "Career 4 description" },
  { label: "career5", value: 14, description: "Career 5 description" },
];

// starting form highest to lowest in score
const sortedData = rawData.sort((a, b) => b.value - a.value);
const labels = sortedData.map((item) => item.label);
const values = sortedData.map((item) => item.value);
const descriptions = sortedData.map((item) => item.description);

export default function Intro() {
  useEffect(() => {
    const canvas = document.getElementById(
      "myPolarChart"
    ) as HTMLCanvasElement | null;
    let myChart: Chart | null = null;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        myChart = new Chart(ctx, {
          type: "polarArea",
          data: {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.7)", // colors can change but having these for rn
                  "rgba(54, 162, 235, 0.7)", //  need to get rid of the numbers in the chart and lines if possible
                  "rgba(255, 206, 86, 0.7)",
                  "rgba(75, 192, 192, 0.7)",
                  "rgba(153, 102, 255, 0.7)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              r: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const index = tooltipItem.dataIndex;
                    return `${labels[index]}: ${values[index]} — ${descriptions[index]}`;
                  },
                },
              },
            },
          },
        });
      } else {
        console.error("Unable to get context for the canvas");
      }
    } else {
      console.error("Canvas element not found");
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  return (
    <main className="flex justify-between mt-20 pt-10 px-8">
      {/* Left: Text and Sorted List */}
      <div className="w-1/2 p-5">
        <h1 className="text-6xl font-extrabold text-black">Results</h1>
        <p className="text-2xl text-black mt-4">
          Based on your survey results, here's your ranked list of career
          matches.
        </p>

        {/* Sorted List */}
        <ul className="mt-6 space-y-4">
          {sortedData.map((item, index) => (
            <li key={index} className="text-lg text-black">
              <strong className="font-semibold">{item.label}</strong>:{" "}
              {item.value} — {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Chart */}
      <div className="flex justify-end p-5">
        <canvas id="myPolarChart" width="400" height="400"></canvas>
      </div>
    </main>
  );
}
