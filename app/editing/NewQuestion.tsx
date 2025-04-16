"use client";

interface NewQuestionProps {
  onAddQuestion: () => void;
}

export default function NewQuestion({ onAddQuestion }: NewQuestionProps) {
  return (
    <div className="flex flex-col items-center p-6">
      <button
        className="flex max-w-[200px] items-center justify-center space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 mt-0 bg-white hover:bg-blue-200 transition-colors duration-300 ease-in-out max-h-[250px] overflow-hidden"
        onClick={onAddQuestion}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-base">{"Create New Question"}</h1>
        </div>
      </button>
    </div>
  );
}