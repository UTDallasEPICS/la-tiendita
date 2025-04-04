import Module from "../Module";

export default function Survey() {
  return (
    <section className="mt-20 p-5 max-w-5xl mx-auto">
      <div className="flex flex-col justify-center">
        <Module type="scale"
          question="Do androids dream of electric sheep?"
        />

        <Module type="mcq"
          question="Do androids dream of electric sheep?"
          answerChoices={[
            "Yes",
            "Probably",
            "Unsure",
            "Probably not",
            "No"
          ]}
        />

        <Module type="open"
          question="Do androids dream of electric sheep?"
        />
      </div>
    </section>
  );
}