'use client'
import { useState, useEffect } from "react"
import { Survey, Question } from "@prisma/client"
import PieChart from "../components/PieChart"
import Loading from "../components/loading"

const BASE_URL = 'http://localhost:3000/api/surveys'

interface QuestionWithChoiceProps {
  index: number,
  question: Question, 
  questionChartData: Record<string, number>
}

function QuestionWithChoice({ index, question, questionChartData }: QuestionWithChoiceProps) {
  const typeMap: Record<string, string> = {
    "SCALAR": "SCALAR",
    "MULTIPLE_CHOICE": "MULTIPLE CHOICE",
    "FREE_RESPONSE": "FREE RESPONSE"
  }

  // Helper to render the appropriate choice based on the question type 
  function renderChoice() {
    if (question.type === "MULTIPLE_CHOICE") {
      const optionsMap = question.optionsMap as Record<string, Record<string, string | number>>
      return (
        <div>
          {Object.keys(optionsMap).map(option =>
            <div 
              key={option} 
              className="mt-2 flex items-center gap-2 border border-accent p-1 rounded-md"
            >
              <div className="px-2">
                <div 
                  className="text-lg text-white w-7 h-7 flex justify-center rounded-full bg-accent shadow-md"
                >{option}</div>
              </div>
              <div className="w-full">
                <div className="font-semibold">{optionsMap[option].option}</div>
                <div className="grid grid-cols-2  w-full">
                  <div><span className="text-sm">Category:</span> <span className="font-semibold">{optionsMap[option].category}</span></div>
                  <div><span className="text-sm">Weight:</span> <span className="font-semibold">{optionsMap[option].weight}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
    else if (question.type === "SCALAR") {
      let range: number[] = []
      for (let i = question.minValue!; i <= question.maxValue!; i++) range.push(i)

      let scaleStrings: string[] = []
      switch (question.maxValue) {
        case 5: {
          scaleStrings = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
          break
        }
        case 3: {
          scaleStrings = ["Disagree", "Neutral", "Agree"]
          break
        }
        case 2: {
          scaleStrings = ["Disagree", "Agree"]
          break
        }
        default: throw new Error("Not a valid scale!")
      }

      return (
        <div>
          {range.map(scaleValue =>
            <div key={scaleValue} className="mt-4 flex items-center gap-4 rounded-md text-lg">
              <div
                className="w-7 h-7 flex justify-center rounded-full bg-accent shadow-md text-white"
              >{scaleValue}</div>
              <div>{scaleStrings[scaleValue - 1]}</div>
            </div>
          )}
        </div>
      )
    }
    else {
      return <div className="text-lg">Answer will be analyzed with the help of LLM.</div>
    }
  }

  return (
    <div className="mt-2 bg-white rounded-xl shadow-md p-4 text-text">
      <div className="flex gap-2 font-semibold text-lg">
        <div>{index}/</div>
        <div>{question.questionString}</div>
      </div>
      <div className="mt-4 grid grid-cols-2">
        <div>
          <div className="grid grid-cols-2">
            <div>
              <div className="text-sm">Category:</div>
              <div className="font-bold text-lg">{question.category}</div>
            </div>
            <div>
              <div className="text-sm">Type:</div>
              <div className="font-bold text-lg">{typeMap[question.type]}</div>
            </div>
          </div>
          <div className="mt-4">{renderChoice()}</div>
        </div>
        <PieChart 
          questionId={question.id} 
          chartType={question.type}
          chartData={question.type === "FREE_RESPONSE" ? 
            {
              'Career 1': 11, 
              'Career 2': 16, 
              'Career 3': 7, 
              'Career 4': 4, 
              'Career 5': 14
            } : questionChartData}/>
      </div>
    </div>
  )
}

interface QuestionListPortionProps {
  surveyID: number,
  totalChartData: Record<string, Record<string, number>>,
}

function QuestionListPortion({ surveyID, totalChartData}: QuestionListPortionProps) {
  console.log(totalChartData)

  const [questionList, setQuestionList] = useState<Question[]>([])
  const [firstIndex, setFirstIndex] = useState<number>(0)
  const pageSize: number = 3

  async function getQuestionList() {
    const response: Response = await fetch(`${BASE_URL}/${surveyID}`)
    const data: any = await response.json()
    setQuestionList(data.questions)
  }
  useEffect(() => { getQuestionList() }, [])

  return (
    <div className="mt-6">
      <div className="flex justify-between text-lg font-semibold">
        <button 
          onClick={() => {
            if (firstIndex - pageSize >= 0) 
              setFirstIndex(firstIndex - pageSize)
          }}
        >Prev</button>
        <button 
          onClick={() => {
            if (firstIndex + pageSize < questionList.length) 
              setFirstIndex(firstIndex + pageSize)
          }}
        >Next</button>
      </div>
      <div>
        {questionList.slice(firstIndex, firstIndex + pageSize).map((question, index) =>
          <QuestionWithChoice 
            key={question.id} 
            index={index + firstIndex + 1} 
            question={question}
            questionChartData={totalChartData[question.id]} />
        )}
      </div>
    </div>
  )
}

// The row of the survey table 
interface SurveyTableRowProps {
  survey: Survey
}

function SurveyTableRow({ survey }: SurveyTableRowProps) {
  const [isDetailPresent, setIsDetailPresent] = useState<boolean>(false)
  const [statData, setStatData] = useState<Record<string, any>>({})

  async function getStatData() {
    try {
      const response: Response = await fetch(`${BASE_URL}/${survey.id}/stats`)
      const data: any = await response.json()
      setStatData(data)
      setIsDetailPresent(!isDetailPresent);
    }
    catch (err) {console.log(err)}
  }

  return (
    <>
      <tr className="bg-white border-t border-primary text-text text-center">
        <td className="py-4" style={{ width: "10%" }}>{survey.id}</td>
        <td style={{ width: "30%" }}>{survey.title}</td>
        <td style={{ width: "20%" }}>{survey.createdAt.toString().slice(0, 10)}</td>
        <td style={{ width: "20%" }}>{survey.updatedAt.toString().slice(0, 10)}</td>
        <td style={{ width: "10%" }}><button
          className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1"
          onClick={() => {  
            getStatData() 
          }}
        >
          {isDetailPresent ? <span>Less</span> : <span>More</span>}
        </button></td>
        <td style={{ width: "10%" }}><button
          className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1"
        >Edit</button></td>
      </tr>
      {isDetailPresent && (
        <tr className="bg-background">
          <td colSpan={6}>
            <div className="w-[80%] mx-auto text-text py-4">
              <div className="flex justify-around">
                {Object.keys(statData.stat).map(field =>
                  <div key={field} className="flex flex-col items-center" >
                    <div className="text-5xl">{statData.stat[field]}</div>
                    <div className="text-sm">{field}</div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex gap-2">
                <div className="font-semibold">Categories:</div>
                <div className="flex gap-2">
                  {(survey.categories as string[]).map(category =>
                    <div
                      key={category}
                      className="inline-block px-2 rounded-xl text-white"
                      style={{ backgroundColor: "#22c55e" }}
                    >{category}</div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-semibold">Description:</div>
                <div className="text-lg">{survey.description}</div>
              </div>
              <QuestionListPortion 
                surveyID={survey.id} 
                totalChartData={statData['choice distribution']} />
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// MAIN COMPONENT 
export default function SurveyTable() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [surveyList, setSurveyList] = useState<Survey[]>([])

  async function getSurveyList() {
    try {
      const response: Response = await fetch(BASE_URL)
      const data: any = await response.json()

      setSurveyList(data)
      setIsLoading(false)
    }
    catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => { getSurveyList() }, [])

  if (isLoading) return <Loading />
  return (
    <div className="w-[80%] mt-10 mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-text">List of surveys ({surveyList.length}):</h1>
      </div>
      <table className="w-full border-collapse shadow-xl mt-2">
        <thead>
          <tr className="bg-primary text-white text-center text-gray-700">
            {["ID", "Title", "Date created", "Date updated", "More", "Edit"].map(field =>
              <th key={field} className="py-2 text-lg">{field}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {surveyList.map(survey => <SurveyTableRow key={survey.id} survey={survey} />)}
        </tbody>
      </table>
    </div>
  )
}