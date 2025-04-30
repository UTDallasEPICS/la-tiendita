"use client";
import React, { useEffect, useState } from "react";
import SurveyTaker from "./survey-taker";
import { Survey } from "../../lib/types";
import { useParams } from "next/navigation";
import NotFound from "../../components/not-found";
import axios from "axios";
import Loading from "../../components/loading";
// Mock survey data for demonstration
// const mockSurvey: Survey = {
//   title: "Personality Assessment",
//   description:
//     "Discover your personality traits through this comprehensive assessment.",
//   categories: [
//     "Openness",
//     "Conscientiousness",
//     "Extraversion",
//     "Agreeableness",
//     "Neuroticism",
//   ],
//   questions: [
//     {
//       category: "Extraversion",
//       questionString:
//         "I enjoy being the center of attention at social gatherings.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Openness",
//       questionString: "I often think about abstract concepts and ideas.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Conscientiousness",
//       questionString:
//         "I prefer to have a detailed plan before starting a project.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Agreeableness",
//       questionString: "Which statement best describes you?",
//       type: "MULTIPLE_CHOICE",
//       optionsMap: {
//         A: {
//           option: "I prioritize harmony in my relationships",
//           category: "Agreeable",
//           weight: 2,
//         },
//         B: {
//           option: "I stand up for my beliefs even if it creates tension",
//           category: "Assertive",
//           weight: 1,
//         },
//         C: {
//           option: "I try to find middle ground in conflicts",
//           category: "Diplomatic",
//           weight: 1,
//         },
//         D: {
//           option: "I prefer to avoid confrontation altogether",
//           category: "Avoidant",
//           weight: 2,
//         },
//       },
//     },
//     {
//       category: "Neuroticism",
//       questionString: "How do you typically handle stress?",
//       type: "MULTIPLE_CHOICE",
//       optionsMap: {
//         A: {
//           option: "I remain calm and collected",
//           category: "Stable",
//           weight: 2,
//         },
//         B: {
//           option: "I feel anxious but manage to cope",
//           category: "Moderate",
//           weight: 1,
//         },
//         C: {
//           option: "I become easily overwhelmed",
//           category: "Sensitive",
//           weight: 1,
//         },
//         D: {
//           option: "I experience significant distress",
//           category: "Reactive",
//           weight: 2,
//         },
//       },
//     },
//     {
//       category: "Openness",
//       questionString:
//         "Describe a time when you tried something completely new. How did it make you feel?",
//       type: "FREE_RESPONSE",
//     },
//     {
//       category: "Extraversion",
//       questionString: "I prefer small gatherings over large parties.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Conscientiousness",
//       questionString: "I keep my belongings organized and tidy.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Agreeableness",
//       questionString: "I find it easy to empathize with others' feelings.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Neuroticism",
//       questionString: "I worry about things frequently.",
//       type: "SCALAR",
//       minValue: 1,
//       maxValue: 5,
//     },
//     {
//       category: "Openness",
//       questionString: "Which of these activities would you most enjoy?",
//       type: "MULTIPLE_CHOICE",
//       optionsMap: {
//         A: {
//           option: "Visiting an art museum",
//           category: "Artistic",
//           weight: 2,
//         },
//         B: {
//           option: "Learning a new scientific concept",
//           category: "Intellectual",
//           weight: 1,
//         },
//         C: {
//           option: "Following a familiar routine",
//           category: "Conventional",
//           weight: 1,
//         },
//         D: { option: "Exploring nature", category: "Experiential", weight: 2 },
//       },
//     },
//     {
//       category: "Personal Growth",
//       questionString:
//         "What are your main goals for personal development in the next year?",
//       type: "FREE_RESPONSE",
//     },
//   ],
// };

export default function tempTake() {
  const { id } = useParams();

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<any | null>(null);
  const [message, setMessage] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSurvey = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/api/surveys/${id}`
          );
          setSurvey(response.data);
          setError(null);
          setErrorCode(null);
          setMessage(null);
        } catch (error: any) {
          setErrorCode(error.status);
          console.log(error);
          setError(error.message);
          setMessage(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSurvey();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return (
  //     <main className="min-h-[89vh] bg-gray-50 py-8">
  //       <div className="max-w-4xl mx-auto px-4 pt-12">
  //         <div>Error: {error}</div>
  //       </div>
  //     </main>
  //   );
  // }

  if (error || !survey) {
    return <NotFound errorCode={errorCode} errorMessage={message} />;
  }

  return (
    <main className="min-h-[89vh] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <SurveyTaker survey={survey} questionsPerPage={5} />
      </div>
    </main>
  );
}
