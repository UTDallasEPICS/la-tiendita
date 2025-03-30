"use client";

import { useState } from 'react';
import QuestionBubble from './QuestionBubble';

interface QuestionBubbleType {
  questionNumber: number;
  type: number;
}

export default function NewQuestion() {
  const [questionBubbles, setQuestionBubbles] = useState<QuestionBubbleType[]>([
    {
      questionNumber: 1,  // Initial question number
      type: 3  // Initial type (or any other value you want)
    }
  ]);
  const addQuestionBubble = () => {
    setQuestionBubbles([
      ...questionBubbles,
      {
        questionNumber: questionBubbles.length + 1, //sets length dynamically
        type: 3
      }
  ])
  };

  return (
    <div className= "flex flex-col items-center p-6">
    
      {/* render buttons dynamically */}
      <div>
    {questionBubbles.map((bubble) => (
      <QuestionBubble
      key={bubble.questionNumber}
      questionNumber= {bubble.questionNumber}
      type= {bubble.type}
      />
    ))} 
    </div>
    
    <button
      //href={...}
      className="flex max-w-[200px] items-center space-x-6 p-6 border-2 border-blue-500 rounded-lg mb-6 mt-0 bg-white hover:bg-blue-200 transition-colors duration-300 ease-in-out max-h-[250px] overflow-hidden"
      //style={{ backgroundColor: 'var(--accent-bg)' }} /* applies accent background */
      onClick={addQuestionBubble}
    >
        <div className="flex flex-col space-y-2">
            <h1 className="text-base">{"Create New Question"}</h1>
        </div>
    </button>

    </div>
  );
}