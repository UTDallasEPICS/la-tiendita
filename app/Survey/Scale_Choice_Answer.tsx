interface ScaleChoiceAnswerProps {
    label: string;
}

export default function Scale_Choice_Answer_Form(props: ScaleChoiceAnswerProps) {
    return (
        <div>
            <input type="radio" id="{props.label}" value="{props.label}"></input>
            <label>{props.label}</label>
        </div>
    );
  }