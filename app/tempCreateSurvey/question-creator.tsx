import React, { useState } from "react";
import { Question, QuestionType, MCQOption } from "./types";

interface QuestionCreatorProps {
  categories: string[];
  onAddQuestion: (question: Question) => void;
  questionCount: number;
}

export default function QuestionCreator({
  categories,
  onAddQuestion,
  questionCount,
}: QuestionCreatorProps) {
  const [questionType, setQuestionType] = useState<QuestionType>("MCQ");
  const [questionString, setQuestionString] = useState("");
  const [category, setCategory] = useState("");

  // for scalar
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(5);

  // for MCQ
  const [options, setOptions] = useState<{ [key: string]: MCQOption }>({
    A: { option: "", category: "", weight: 0 },
  });

  const handleAddOption = () => {
    const nextKey = String.fromCharCode(65 + Object.keys(options).length); // Converts it to A, B, C, ..., Z, AA, BB ...
    setOptions({
      ...options,
      [nextKey]: { option: "", category: "", weight: 0 },
    });
  };

  const handleOptionChange = (
    key: string,
    field: keyof MCQOption,
    value: string | number
  ) => {
    setOptions({
      ...options,
      [key]: {
        ...options[key],
        [field]: value,
      },
    });
  };

  const handleDeleteOption = (keyToDelete: string) => {
    const newOptions: { [key: string]: MCQOption } = {};

    // Rebuild the options map with updated keys
    let charCode = 65; // ASCII for 'A'
    Object.entries(options)
      .filter(([key]) => key !== keyToDelete)
      .forEach(([_, value]) => {
        const newKey = String.fromCharCode(charCode++);
        newOptions[newKey] = value;
      });

    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!questionString.trim()) {
      alert("Please enter a question");
      return;
    }

    if (categories.length === 0) {
      alert("Please add at least one category first");
      return;
    }

    if (!category && questionType !== "FRQ") {
      alert("Please select a category");
      return;
    }

    const baseQuestion = {
      id: questionCount + 1, // this will be replaced during the POST request operation
      surveyID: 1, // this will be replaced during the POST request operation
      category,
      questionString,
      type: questionType,
    };

    let newQuestion: Question;

    switch (questionType) {
      case "Scalar":
        newQuestion = {
          ...baseQuestion,
          type: "Scalar",
          min_value: minValue,
          max_value: maxValue,
        };
        break;

      case "MCQ":
        // validating that the options actually have values.
        const hasEmptyOptions = Object.values(options).some(
          (opt) => !opt.option.trim() || !opt.category.trim()
        );
        if (hasEmptyOptions) {
          alert("Please fill in all option fields");
          return;
        }

        newQuestion = {
          ...baseQuestion,
          type: "MCQ",
          optionsMap: options,
        };
        break;

      case "FRQ":
        newQuestion = {
          ...baseQuestion,
          type: "FRQ",
        };
        break;

      default:
        return;
    }

    onAddQuestion(newQuestion);

    // resetting form
    setQuestionString("");
    setCategory("");
    setMinValue(1);
    setMaxValue(5);
    setOptions({
      A: { option: "", category: "", weight: 0 },
    });
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Question</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Question Type
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full p-2 border border-border rounded-md"
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="Scalar">Scalar (Range)</option>
            <option value="FRQ">Free Response</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Question</label>
          <input
            type="text"
            value={questionString}
            onChange={(e) => setQuestionString(e.target.value)}
            className="w-full p-2 border border-border rounded-md"
            placeholder="Enter your question"
          />
        </div>

        {questionType !== "FRQ" && (
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-border rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {questionType === "Scalar" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Min Value
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(parseInt(e.target.value))}
                className="w-full p-2 border border-border rounded-md"
                min={1}
                max={maxValue - 1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Max Value
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(parseInt(e.target.value))}
                className="w-full p-2 border border-border rounded-md"
                min={minValue + 1}
              />
            </div>
          </div>
        )}

        {questionType === "MCQ" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Options</h3>

            {Object.entries(options).map(([key, option]) => (
              <div key={key} className="p-3 border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Option {key}</h4>
                  {Object.keys(options).length > 1 && (
                    <button
                      onClick={() => handleDeleteOption(key)}
                      className="text-destructive hover:text-destructive-foreground"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Option Text
                    </label>
                    <input
                      type="text"
                      value={option.option}
                      onChange={(e) =>
                        handleOptionChange(key, "option", e.target.value)
                      }
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="Enter option text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={option.category}
                      onChange={(e) =>
                        handleOptionChange(key, "category", e.target.value)
                      }
                      className="w-full p-2 border border-border rounded-md"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Weight
                    </label>
                    <input
                      type="number"
                      value={option.weight || 0}
                      onChange={(e) =>
                        handleOptionChange(
                          key,
                          "weight",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddOption}
              className="w-full p-2 bg-secondary text-secondary-foreground rounded-md"
            >
              Add Option
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-primary text-primary-foreground rounded-md"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
