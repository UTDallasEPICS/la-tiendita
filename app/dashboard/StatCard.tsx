export default function StatCard() {
  const mainMetrics: Record<string, string> = {
    // Should probably replace values with call from api or omit entirely.....
    "Total Users": "2",
    "Completed Surveys": "2",
    "Pending Surveys": "10",
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-[80%] m-auto">
      {Object.keys(mainMetrics).map((metric) => (
        <div
          key={metric}
          className="bg-white text-text shadow-lg p-1 rounded-lg"
        >
          <div className="text-lg font-semibold">{metric}:</div>
          <div className="float-right text-3xl mt-1 font-bold">
            {mainMetrics[metric]}
          </div>
        </div>
      ))}
    </div>
  );
}
