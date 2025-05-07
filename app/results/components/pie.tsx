"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  PieController,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { SurveyResults } from "../../lib/types";

Chart.register(ArcElement, PieController, CategoryScale, Tooltip, Legend);

type Props = {
  surveyResult: SurveyResults;
};

export default function Intro({ surveyResult }: Props) {
  const chartRef = useRef<Chart | null>(null);

  // aggregate scores by category
  const categoryScores: Record<string, number> = {};
  surveyResult.answersData.forEach(({ question, answer }) => {
    switch (question.type) {
      case "SCALAR":
        if (typeof answer === "number") {
          categoryScores[question.category] =
            (categoryScores[question.category] || 0) + answer;
        }
        break;
      case "MULTIPLE_CHOICE":
        if (typeof answer === "string") {
          const optionsMap = (question as any).optionsMap;
          const selectedOption = optionsMap?.[answer];
          if (selectedOption) {
            const weight = selectedOption.weight ?? 1;
            const category = selectedOption.category;
            categoryScores[category] = (categoryScores[category] || 0) + weight;
          }
        }
        break;
      // FREE_RESPONSE is ignored for chart purposes, at the moment, later we might try to use an LLM to analyze the text and map it to a category.
    }
  });

  // sort data in descending order by value
  const sortedData = Object.entries(categoryScores)
    .map(([label, value]) => ({
      label,
      value,
      description: `Total score from answers in ${label}`,
    }))
    .sort((a, b) => b.value - a.value);

  const labels = sortedData.map((item) => item.label);
  const values = sortedData.map((item) => item.value);
  const descriptions = sortedData.map((item) => item.description);

  useEffect(() => {
    const canvas = document.getElementById(
      "PieChart"
    ) as HTMLCanvasElement | null;
    if (!canvas) return console.error("Canvas element not found");

    const ctx = canvas.getContext("2d");
    if (!ctx) return console.error("Unable to get context for canvas");

    // destroy previous chart if it exists..
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const index = tooltipItem.dataIndex;
                return `${labels[index]} — ${values[index]} — ${descriptions[index]}`;
              },
            },
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [labels, values, descriptions]);

  return (
    <main className="flex justify-between mt-20 pt-10 px-8">
      {/* left: header, description, list */}
      <div className="w-1/2 p-5">
        <h1 className="text-6xl font-extrabold text-black">Results</h1>
        <p className="text-2xl text-black mt-4">
          Based on your survey responses, here's your ranked list of career
          categories:
        </p>
        <ul className="mt-6 space-y-4">
          {sortedData.map((item, index) => (
            <li key={index} className="text-lg text-black">
              <strong className="font-semibold">{item.label}</strong>:{" "}
              <span className="underline font-bold">{item.value}</span> —{" "}
              {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* right: pie chart */}
      <div className="flex justify-end p-5">
        <canvas id="PieChart" width="400" height="400" />
      </div>
    </main>
  );
}
