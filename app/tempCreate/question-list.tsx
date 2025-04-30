import type { Question } from "./types";

interface QuestionListProps {
  questions: Question[];
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (question: Question) => void;
}

export default function QuestionList({
  questions,
  onEditQuestion,
  onDeleteQuestion,
}: QuestionListProps) {
  const renderQuestionDetails = (question: Question) => {
    switch (question.type) {
      case "SCALAR":
        const scalarQuestion = question as any;
        return (
          <div className="mt-2 text-sm text-gray-600">
            <p>
              Range: {scalarQuestion.min_value} - {scalarQuestion.max_value}
            </p>
          </div>
        );

      case "MULTIPLE_CHOICE":
        const mcqQuestion = question as any;
        return (
          <div className="mt-2 space-y-1">
            {Object.entries(mcqQuestion.optionsMap).map(
              ([key, option]: [string, any]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium">{key}:</span> {option.option}
                  <span className="text-gray-500">
                    {" "}
                    (Category: {option.category || "None"}, Weight:{" "}
                    {option.weight || 0})
                  </span>
                </div>
              )
            )}
          </div>
        );

      case "FREE_RESPONSE":
        return (
          <div className="mt-2 text-sm text-gray-600">
            <p>Free response question</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Questions</h2>

      {questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question, idx) => (
            <div key={idx} className="border p-4 rounded-md">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {question.type}
                    </span>
                    {question.category && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {question.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium mt-2">
                    {question.questionString}
                  </h3>
                  {renderQuestionDetails(question)}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditQuestion(question)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteQuestion(question)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No questions added yet.</p>
      )}
    </div>
  );
}
