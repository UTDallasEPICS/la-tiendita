"use client";
import { useState, useRef, useEffect } from 'react';

interface questionBubbleProps {
    questionNumber: number;
    type: number;
    onDeleteQuestion: (questionNumber: number) => void;
}

export default function QuestionBubble({ 
  questionNumber,
  type,
  onDeleteQuestion
}: questionBubbleProps) {
  const[text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '${textareaRef.current.scrollHeightpx';
    }
  }, [text]);

return (
  <div
    className="flex-col items-center space-x-6 p-6 border-2 min-w-[600px] border-blue-500 rounded-lg mb-6 mt-5 overflow-hidden"
  >
    {/* text box */}
    <div className="flex-grow flex-col space-y-2 w-full X">
      <h1 className="text-xl font-semibold text-customGray">{questionNumber}</h1>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="border-2 p-2 rounder-lg bg-transparent border-transparent resize-none w-full min-w-[280px] placeholder:text-gray-400"
        placeholder="Type the question..."
      />
    </div>

    {/* bottom buttons */}
    <div
      className="flex mt-2 pr-5 justify-end w-full"
    >
      {/* trash button */}
      <button 
        onClick= {() => onDeleteQuestion(questionNumber)}
        className="relative group cursor-pointer"
      >
        <img
          src="/trashicongray.png"
          alt="Delete"
          className="w-5 h-5 group-hover:hidden"
        />
        <img
          src="/trashiconred.png"
          alt="Delete (hover)"
          className="w-5 h-5 hidden group-hover:block absolute"
        />
      </button>
    </div>

  </div>
)
}