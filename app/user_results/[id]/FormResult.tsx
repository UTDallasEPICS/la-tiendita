'use client'
import { useState } from "react"
import { Survey, SurveyResult, Question, Choice } from "../../interface"

// The head of the result form
interface ResultHeadProps {
	title: string, 
	status: string, 
	detailPresent: boolean,
	onButtonClick: () => void
}

function ResultHead({title, status, detailPresent, onButtonClick}: ResultHeadProps) {

	return (
		<div className="flex justify-between bg-primary p-2 rounded-xl">
			<div className="flex items-center gap-2">
				<h2 className="text-xl font-bold">{title}</h2>
				<span className="bg-lime-500 text-sm text-white rounded-lg px-1">{status}</span>
			</div>
			<button
				className="bg-accent text-white rounded-lg px-1"
				onClick={onButtonClick}
			>{detailPresent ? "Less" : "More"}</button>
		</div>
	)
}

// The question display, including the category and the weight 
interface QuestionPortionProps {
	index: number,
	question: Question
}

function QuestionPortion({ index, question }: QuestionPortionProps) {

	return (
		<div className="mt-8">
			<div className="flex gap-2 text-lg font-semibold">
				<div>{index}/</div>
				<div>{question.questionString}</div>
			</div>
			<div className="w-[95%] mx-auto flex gap-4">
				<div><span className="font-semibold">Category:</span> {question.category}</div>
				<div><span className="font-semibold">Weight:</span> {question.weight}</div>
			</div>
		</div>
	)
}


// Depending on the type of question, 
// the answer might be displayed differently 
interface AnswerPortionProps {
	questionType: string,
	choiceList: Choice[],
	answer: string | number
}

function AnswerPortion({ questionType, choiceList, answer }: AnswerPortionProps) {

	let resultString: string = ''
	if (questionType === "MCQ") {
		const answerMap: Map<string, number> = new Map([
			['A', 0], ['B', 1], ['C', 2], ['D', 3]
		])

		// This case, answer is treated as a string 
		const answerIx = answerMap.get((answer as string))
		if (answerIx != undefined) {
			resultString = `${answer}. ${choiceList[answerIx].choiceString}`
		}
		else {
			// This indicates something wrong has happened 
			throw new Error("Not a valid option!");
		}
	}
	else if (questionType === "Scale") {
		const scaleString: string[] = [
			"Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"
		]

		// This case, answer is treated as number 
		resultString = scaleString[(answer as number) - 1]
	}
	else {
		resultString = (answer as string)
	}

	return (
		<div className="flex gap-2 w-[95%] mt-2 mx-auto text-text">
			<div className="font-semibold text-md">Answer: </div>
			<div className="text-lg">{resultString}</div>
		</div>
	)
}

// MAIN COMPONENT
interface FormResultProps {
	survey: Survey,
	result: SurveyResult
}

export default function FormResult({ survey, result }: FormResultProps) {
	const [detailPresent, setDetailPresent] = useState(false)

	return (
		<div className="text-text w-[80%] mx-auto bg-white p-2 rounded-2xl shadow-lg">
			<ResultHead
				title={survey.title}
				status={result.status}
				detailPresent={detailPresent}
				onButtonClick={() => setDetailPresent(!detailPresent)}
			/>
			{detailPresent && (
				<div className="px-2 pb-4">
					{survey.questions.map((question, index) =>
						<div key={question.id}>
							<QuestionPortion index={index + 1} question={question} />
							<AnswerPortion
								questionType={question.type}
								choiceList={question.choices}
								answer={result.answersData[index + 1]}
							/>
						</div>
					)}
					<button
						className="bg-accent text-lg text-white rounded-lg px-1 block mt-4 mx-auto"
						onClick={() => setDetailPresent(false)}
					>Hide</button>
				</div>
			)}
		</div>
	)
}