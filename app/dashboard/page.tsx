import UserTable from "./UserTable"
import StatCard from "./StatCard"
import SurveyTable from "./SurveyTable"

export default function Page() {
  
  return (
    <div className="mt-16 mb-10">
      <StatCard />
      <UserTable />
      <SurveyTable />
    </div>
  )
}