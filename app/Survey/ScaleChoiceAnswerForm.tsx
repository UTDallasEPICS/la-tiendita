interface ScaleChoiceAnswerFormProps {
  minLabel?: string
  maxLabel?: string
  numChoices?: number
}

export default function ScaleChoiceAnswerForm(props: ScaleChoiceAnswerFormProps) {
  let numChoices = props.numChoices ?? 0;

  if (numChoices == 0) { return <></>; }

  let minLabel = props.minLabel;
  let maxLabel = props.maxLabel;

  let answerChoiceInputs = [];
  for (let i = 1; i <= numChoices; i++) {
    answerChoiceInputs.push(
      <input 
        key={i} 
        type="radio" 
        id={i.toString()} 
        name="scale-choice" 
        value={i.toString()} 
      />
    );
  }

  return (
    <form className="flex flex-row w-full space-x-5">
      <label htmlFor={answerChoiceInputs[0].props.id}>{minLabel}</label>
      {answerChoiceInputs}
      <label htmlFor={answerChoiceInputs[numChoices - 1].props.id}>{maxLabel}</label>
    </form>
  );
}