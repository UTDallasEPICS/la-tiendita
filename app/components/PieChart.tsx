//maybe helpful once we have data
// labels: labels,
//datasets: [{
//data: values,
//}]

"use client";

import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, PieController, Tooltip, Legend, CategoryScale, Title } from 'chart.js';

// Register the Chart.js components
Chart.register(ArcElement, PieController, CategoryScale, Tooltip, Legend, Title);

interface PieChartProps {
  questionId: number, 
  chartType: string, 
  chartData: Record<string, number>
}

export default function PieChart({ 
  questionId, 
  chartType,
  chartData = {},
}: PieChartProps) {
  console.log(chartData)

  const labels = Object.keys(chartData)
  const values = Object.values(chartData)
  let chartTitle = '';

  switch (chartType) {
    case 'FREE_RESPONSE': {
      chartTitle = 'Sample distribution for analysis'
      break
    }
    case 'SCALAR': {
      chartTitle = 'Distribution of scale'
      break
    }
    case 'MULTIPLE_CHOICE': {
      chartTitle = 'Distribution of choice'
      break
    }
  }

  useEffect(() => {
    const canvas = document.getElementById(`PieChart${questionId}`) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.7)", 
                  "rgba(54, 162, 235, 0.7)",
                  "rgba(255, 206, 86, 0.7)",
                  "rgba(75, 192, 192, 0.7)",
                  "rgba(153, 102, 255, 0.7)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                color: 'black',
                text: chartTitle,
                font: {
                  size: 18,
                }
              },
              legend:{
                display: true,
                position: 'bottom',
              }
            },
          },
        }
      );
      } else {
        console.error("Unable to get context for the canvas");
      }
    } else {
      console.error("Canvas element not found");
    }

    return () => {
      myChart.destroy()
    }
  }, []);

  return (
      <div className="flex justify-center">
        <div className="w-[80%]"><canvas id={`PieChart${questionId}`} width="350" height="350"></canvas></div>
      </div>
  );
}
