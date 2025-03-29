interface FormProps {
    numChoices: number;
    lowLabel: string;
    highLabel: string;
}

export default function Scale_Choice_Answer_Form(props: FormProps) {
    return (
        <form>
            <input type="radio" id="Strongly Disagree" value="Strongly Disagree"></input>
            <label>Strongly Disagree</label><br/>

            <input type="radio" id="Disagree" value="Disagree"></input>
            <label>Disagree</label><br/>

            <input type="radio" id="Neutral" value="Neutral"></input>
            <label>Neutral</label><br/>

            <input type="radio" id="Agree" value="Agree"></input>
            <label>Agree</label><br/>

            <input type="radio" id="Strongly Agree" value="Strongly Agree"></input>
            <label>Strongly Agree</label><br/>
        </form>
    );
}