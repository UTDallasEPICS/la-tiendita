import { useState, useEffect } from "react";
import type {
  Question,
  QuestionType,
  ScalarQuestion,
  MCQQuestion,
  FRQQuestion,
} from "./types";

interface QuestionCreatorProps {
  categories: string[];
  onAddQuestion: (question: Question) => void;
  editingQuestion: Question | null;
  onUpdateQuestion: (question: Question) => void;
  onCancelEdit: () => void;
}

export default function QuestionCreator({
  categories,
  onAddQuestion,
  editingQuestion,
  onUpdateQuestion,
  onCancelEdit,
}: QuestionCreatorProps) {
  const [questionType, setQuestionType] = useState<QuestionType>("SCALAR");
  const [questionString, setQuestionString] = useState("");
  const [category, setCategory] = useState("");

  // Scalar specific state
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(5);

  // MCQ specific state
  const [options, setOptions] = useState<{
    [key: string]: { option: string; category: string; weight?: number };
  }>({
    A: { option: "", category: "", weight: 0 },
    B: { option: "", category: "", weight: 0 },
  });

  // Reset form or populate with editing question
  useEffect(() => {
    if (editingQuestion) {
      setQuestionType(editingQuestion.type);
      setQuestionString(editingQuestion.questionString);
      setCategory(editingQuestion.category);

      if (editingQuestion.type === "SCALAR") {
        const scalarQuestion = editingQuestion as ScalarQuestion;
        setMinValue(scalarQuestion.minValue);
        setMaxValue(scalarQuestion.maxValue);
      } else if (editingQuestion.type === "MULTIPLE_CHOICE") {
        const mcqQuestion = editingQuestion as MCQQuestion;
        setOptions(mcqQuestion.optionsMap);
      }
    } else {
      resetForm();
    }
  }, [editingQuestion]);

  const resetForm = () => {
    setQuestionType("SCALAR");
    setQuestionString("");
    setCategory("");
    setMinValue(1);
    setMaxValue(5);
    setOptions({
      A: { option: "", category: "", weight: 0 },
      B: { option: "", category: "", weight: 0 },
    });
  };

  const handleAddOption = () => {
    const keys = Object.keys(options);
    const nextKey = String.fromCharCode(65 + Object.keys(options).length); // A, B, C, ...
    setOptions({
      ...options,
      [nextKey]: { option: "", category: "", weight: 0 },
    });
  };

  const handleRemoveOption = (key: string) => {
    const newOptions = { ...options };
    delete newOptions[key];

    // Reindex the keys to be sequential (A, B, C, ...)
    const reindexedOptions: {
      [key: string]: { option: string; category: string; weight?: number };
    } = {};
    Object.values(newOptions).forEach((value, index) => {
      const newKey = String.fromCharCode(65 + index);
      reindexedOptions[newKey] = value;
    });

    setOptions(reindexedOptions);
  };

  const handleOptionChange = (
    key: string,
    field: "option" | "category" | "weight",
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

  const handleSubmit = () => {
    if (!questionString.trim()) {
      alert("Please enter a question");
      return;
    }

    let newQuestion: Question;

    if (questionType === "SCALAR") {
      newQuestion = {
        // id: editingQuestion?.id || 0,
        // surveyID: editingQuestion?.surveyID || 0,
        type: "SCALAR",
        questionString,
        category,
        minValue: minValue,
        maxValue: maxValue,
      } as ScalarQuestion;
    } else if (questionType === "MULTIPLE_CHOICE") {
      // validating mcq questions
      const hasEmptyOption = Object.values(options).some(
        (opt) => !opt.option.trim()
      );
      if (hasEmptyOption) {
        alert("Please fill in all option fields");
        return;
      }

      newQuestion = {
        // id: editingQuestion?.id || 0,
        // surveyID: editingQuestion?.surveyID || 0,
        type: "MULTIPLE_CHOICE",
        questionString,
        category,
        optionsMap: options,
      } as MCQQuestion;
    } else {
      newQuestion = {
        // id: editingQuestion?.id || 0,
        // surveyID: editingQuestion?.surveyID || 0,
        type: "FREE_RESPONSE",
        questionString,
        category,
      } as FRQQuestion;
    }

    if (editingQuestion) {
      onUpdateQuestion(newQuestion);
    } else {
      onAddQuestion(newQuestion);
      resetForm();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editingQuestion ? "Edit Question" : "Create New Question"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Type
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!editingQuestion}
          >
            <option value="SCALAR">Scalar (Range)</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="FREE_RESPONSE">Free Response</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <input
            type="text"
            value={questionString}
            onChange={(e) => setQuestionString(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your question"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* SCALAR Question */}
        {questionType === "SCALAR" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Value
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Value
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* MULTIPLE_CHOICE Question  */}
        {questionType === "MULTIPLE_CHOICE" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">Options</h3>
              <button
                type="button"
                onClick={handleAddOption}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Option
              </button>
            </div>

            {Object.entries(options).map(([key, option]) => (
              <div key={key} className="border p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Option {key}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(key)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    disabled={Object.keys(options).length <= 2}
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Option Text
                    </label>
                    <input
                      type="text"
                      value={option.option}
                      onChange={(e) =>
                        handleOptionChange(key, "option", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter option text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={option.category}
                      onChange={(e) =>
                        handleOptionChange(key, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight
                    </label>
                    <input
                      type="number"
                      value={option.weight}
                      onChange={(e) =>
                        handleOptionChange(
                          key,
                          "weight",
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          {editingQuestion && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {editingQuestion ? "Update Question" : "Add Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
