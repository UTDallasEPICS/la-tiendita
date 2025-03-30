import NewQuestion from "./NewQuestion";

export default function Editing() {
  return (
    
    <section className="mt-20 p-5 max-w-[1000px] mx-auto">
      <div className="flex flex-wrap flex-col justify-center items-center">
        {/* <QuestionBubble
          questionNumber= {1} // dynamic? instead? hmmm
          question= "What time is it"
          type= {2}
        /> */}

        {/*<hr className="my-4 border-gray-400" /> This adds a line so they are on top of each other*/}
        
        <NewQuestion/>
      </div>
    </section>
  );
}

// Put NewQuestion and QuestionBubble to the same level
// Passing a function as a prop