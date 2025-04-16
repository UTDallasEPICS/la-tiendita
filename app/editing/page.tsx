"use client";

import { useState } from 'react';
import NewQuestion from "./NewQuestion";
import QuestionBubble from './QuestionBubble';

interface QuestionBubbleType {
  questionNumber: number;
  type: number;
}

export default function Editing() {
  {/**/}
  const [questionBubbles, setQuestionBubbles] = useState<QuestionBubbleType[]>([
    {
      questionNumber: 1,
      type: 3
    }
  ]);

  const addQuestionBubble = () => {
    setQuestionBubbles([
      ...questionBubbles,
      {
        questionNumber: questionBubbles.length + 1,
        type: 3
      }
    ]);
  };

  const deleteQuestionBubble = (questionNumber : number) => {
    setQuestionBubbles(prevBubbles => {
      // make a new array with everything but the correct question
      const newBubbles = prevBubbles.filter(bubble => bubble.questionNumber !== questionNumber);

      //reassign numbers sequentially
      return newBubbles.map((bubble, index) => ({
        ...bubble,
        questionNumber: index + 1
      }))
    })
  };

  return (
    <section className="mt-20 p-5 max-w-[1000px] mx-auto">
      <div className="flex flex-wrap flex-col justify-center items-center">
        {/* rendering the QuestionBubbles here */}
        {questionBubbles.map((bubble) => (
          <QuestionBubble
            key={bubble.questionNumber}
            questionNumber={bubble.questionNumber}
            type={bubble.type}
            onDeleteQuestion={deleteQuestionBubble}
          />
        ))}
        
        <NewQuestion onAddQuestion={addQuestionBubble} />
      </div>
    </section>
  );
}

// Put NewQuestion and QuestionBubble to the same level
// Passing a function as a prop