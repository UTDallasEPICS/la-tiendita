export default function ScaleChoiceAnswerForm() {
    return (
        <form className="flex flex-row w-full space-x-5">
            <label htmlFor="strongly-disagree">Strongly Disagree</label>
            <input type="radio" id="strongly-disagree" name="scale-choice" value="Strongly Disagree" />
            <input type="radio" id="disagree" name="scale-choice" value="Disagree" />
            <input type="radio" id="neutral" name="scale-choice" value="Neutral" />
            <input type="radio" id="agree" name="scale-choice" value="Agree" />
            <input type="radio" id="strongly-agree" name="scale-choice" value="Strongly Agree" />
            <label htmlFor="strongly-agree">Strongly Agree</label>
        </form>
    );
}