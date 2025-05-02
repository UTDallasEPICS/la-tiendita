

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, PieController, Tooltip, Legend, CategoryScale } from 'chart.js';

Chart.register(ArcElement, PieController, CategoryScale, Tooltip, Legend);


interface CareerData {
  label: string;
  value: number;
  description: string;
}

interface IntroProps {
  data?: CareerData[]; // optional prop, not sure if needed
}

export default function Intro({ data }: IntroProps) {
  const chartRef = useRef<Chart | null>(null);
  const [rawData, setRawData] = useState<CareerData[] | null>(data || null);

  // Fetch data only if it's not passed as a prop
  useEffect(() => {
    if (!rawData) {
      fetch('') // for branch/API 
        .then((res) => res.json())
        .then((fetchedData) => setRawData(fetchedData))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [rawData]);

  // Sort and prepare chart data, organized by number like before 
  const sortedData = rawData ? [...rawData].sort((a, b) => b.value - a.value) : [];
  const labels = sortedData.map((item) => item.label);
  const values = sortedData.map((item) => item.value);
  const descriptions = sortedData.map((item) => item.description);

  // Draw the chart
  useEffect(() => {
    if (!rawData) return;

    const canvas = document.getElementById('PieChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: [  //colors can change later 
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const index = tooltipItem.dataIndex;
                return `${labels[index]}: ${values[index]} — ${descriptions[index]}`;
              },
            },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [rawData]);

  if (!rawData) return <div className="text-black p-10">Loading results...</div>;

  return (
    <main className="flex justify-between mt-20 pt-10 px-8">
      <div className="w-1/2 p-5">
        <h1 className="text-6xl font-extrabold text-black">Results</h1>
        <p className="text-2xl text-black mt-4">
          Based on your survey results, here's your ranked list of career matches.
        </p>
        <ul className="mt-6 space-y-4">
          {sortedData.map((item, index) => (
            <li key={index} className="text-lg text-black">
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end p-5">
        <canvas id="PieChart" width="400" height="400"></canvas>
      </div>
    </main>
  );
}
