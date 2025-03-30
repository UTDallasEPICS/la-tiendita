"use client";
import { useState, useRef, useEffect } from 'react';

interface qProps {
    questionNumber: number;
    type: number;
}

export default function QuestionBubble(props: qProps) {
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
    className="flex items-center space-x-6 p-6 border-2 min-w-[600px] border-blue-500 rounded-lg mb-6 mt-5 overflow-hidden"
  >

    <div className="flex flex-col space-y-2 X">
      <h1 className="text-xl font-semibold text-customGray">{props.questionNumber}</h1>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="border-2 p-2 rounder-lg bg-transparent border-transparent resize-none w-full max-w-[280px] min-w-[280px] placeholder:text-gray-400"
        placeholder="Type the question..."
      />

      {/* <div className="mt-4">
        <p>{text}</p>
      </div> */}
    </div>
  </div>
)
}