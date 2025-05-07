"use client";
import { useState } from "react";
import { Survey, SurveyResult, Question } from "@/app/interface";

// The head of the result form
interface ResultHeadProps {
  title: string;
  status: string;
  detailPresent: boolean;
  onButtonClick: () => void;
}

function ResultHead({
  title,
  status,
  detailPresent,
  onButtonClick,
}: ResultHeadProps) {
  // Determine the color of the status card
  const colorMap: Record<string, string> = {
    Ongoing: "#84cc16",
    Complete: "#22c55e",
  };

  return (
    <div className="flex justify-between bg-primary py-2 px-4 rounded-xl">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <span
          className="text-sm text-white rounded-lg px-1"
          style={{ backgroundColor: colorMap[status] }}
        >
          {status}
        </span>
      </div>
      <button
        className="bg-accent text-white rounded-lg px-1"
        onClick={onButtonClick}
      >
        {detailPresent ? "Less" : "More"}
      </button>
    </div>
  );
}

// The question display, including the category and the weight
interface QuestionPortionProps {
  index: number;
  question: string;
}

export function QuestionPortion({ index, question }: QuestionPortionProps) {
  return (
    <div className="mt-4">
      <div className="flex gap-2 text-lg font-semibold">
        <div>{index + ")"}</div>
        <div>{question}</div>
      </div>
    </div>
  );
}

// Depending on the type of question, the answer might be displayed differently
interface AnswerPortionProps {
  questionType: string;
  maxScale: number;
  optionsMap: Record<string, Record<string, string | number>>;
  answer: string | number | undefined;
}

function AnswerPortion({
  questionType,
  optionsMap,
  maxScale,
  answer,
}: AnswerPortionProps) {
  let optionString: string = "";

  // If the user hasn't answered, no field in the record => undefined value
  if (answer === undefined) optionString = "Not answered yet.";
  else if (questionType === "MULTIPLE_CHOICE") {
    // This case, answer is treated as a string
    if (!optionsMap[answer]) throw new Error("Not a valid option!");
    optionString = `${answer}. ${optionsMap[answer].option}`;
  } else if (questionType === "SCALAR") {
    // Determine the appropriate scale
    let scaleStrings: string[] = [];
    switch (maxScale) {
      case 5: {
        scaleStrings = [
          "Strongly disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ];
        break;
      }
      case 3: {
        scaleStrings = ["Disagree", "Neutral", "Agree"];
        break;
      }
      case 2: {
        scaleStrings = ["Disagree", "Agree"];
        break;
      }
      default:
        throw new Error("Not a valid scale!");
    }
    // This case, answer is treated as number
    optionString = scaleStrings[(answer as number) - 1];
  } else if (questionType === "FREE_RESPONSE") optionString = answer as string;
  else throw new Error("Not a valid question type!");

  return (
    <div
      className="flex gap-2 w-[95%] mt-1 mx-auto text-text"
      style={
        questionType !== "FREE_RESPONSE"
          ? { alignItems: "center" }
          : { alignItems: "baseline" }
      }
    >
      <div className="font-semibold text-md">Answer: </div>
      <div className="text-lg">{optionString}</div>
    </div>
  );
}

// MAIN COMPONENT
interface FormResultProps {
  survey: Survey;
  result: SurveyResult;
}

export default function FormResult({ survey, result }: FormResultProps) {
  const [detailPresent, setDetailPresent] = useState<boolean>(false);

  return (
    <div className="text-text w-3/4 mx-auto bg-white rounded-2xl shadow-lg">
      <ResultHead
        title={survey.title}
        status={result.status}
        detailPresent={detailPresent}
        onButtonClick={() => setDetailPresent(!detailPresent)}
      />
      <div className="px-4">
        {detailPresent && (
          <div className="px-2 pb-4">
            <div className="mt-2 font-semibold">
              (Last updated: {result.updatedAt.toString().slice(0, 10)})
            </div>
            {(result.answersData as Record<string, any>[]).map(
              (data, index) => (
                <div key={index}>
                  <QuestionPortion
                    index={index + 1}
                    question={data.question.questionString}
                  />
                  <AnswerPortion
                    questionType={data.question.type}
                    maxScale={data.question.maxValue}
                    optionsMap={data.question.optionsMap}
                    answer={data.answer}
                  />
                </div>
              )
            )}
            <hr className="border mt-2 bg-text"></hr>
            <button
              className="bg-accent text-xl text-white rounded-lg px-2 block mt-4 mx-auto"
              onClick={() => setDetailPresent(false)}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
