import Quick from "../Surveys/Quick_Links"
export default function Surveys() {
  return (
    <section>
      <h1 className="text-6xl text-center font-extrabold text-customGray">Our Surveys</h1>

      <div className="flex justify-center mt-4">
        <Quick image="/logo.png" />
        <Quick image="/logo.png" />
        <Quick image="/logo.png" />
        <Quick image="/logo.png" />
        <Quick image="/logo.png" />
      </div>
    </section>
  )
}
