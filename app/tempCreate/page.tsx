import SurveyCreator from "./survey-creator";

export default function Home() {
  return (
    <main className="container mx-auto p-4 pt-12">
      <h1 className="text-3xl font-bold mb-6">Survey Creator</h1>
      <SurveyCreator />
    </main>
  );
}
