"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tests from "./Tests";

interface SurveyData {
  id: number;
  title: string;
  description: string;
  categories: string[];
}

export default function Assessment() {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const tempImages = [
    "/logo3.jpeg",
    "/survey_1.png",
    "/survey_2.png",
    "/survey_3.png",
    "/survey_4.png",
    "/survey_5.png",
    "/survey_6.png",
  ];

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get<SurveyData[]>("/api/surveys"); // replace with your actual endpoint
        setSurveys(response.data);
      } catch (error) {
        console.error("Failed to fetch surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <section className="mt-16 p-5 pt-0 max-w-5xl mx-auto">
      <h1 className="text-text text-3xl font-bold text-center">Our Surveys</h1>
      <div className="mt-4 flex flex-wrap justify-center gap-6">
        {surveys.map((assessment, index) => (
          <Tests
            key={assessment.id}
            link={`/tempTake/${assessment.id}`}
            image={tempImages[index % tempImages.length]}
            assessment={assessment.title}
            description={assessment.description}
          />
        ))}
      </div>
    </section>
  );
}
