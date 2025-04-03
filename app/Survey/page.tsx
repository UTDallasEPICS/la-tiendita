import Module from "./Module";

export default function Survey() {
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-col justify-center">
        <Module question="Do androids dream of electric sheep?"
        type="scale" answerChoices={[]}/>

        <Module question="Do androids dream of electric sheep?"
        type="mcq" answerChoices={[
          "Yes",
          "Probably",
          "Unsure",
          "Probably not",
          "No"
        ]} />

        <Module question="Do androids dream of electric sheep?"
        type="open" answerChoices={[]}/>
      </div>
    </section>
  );
}