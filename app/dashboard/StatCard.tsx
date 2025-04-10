export default function StatCard() {

	const mainMetrics: Record<string, string> = {
		"Total Users": "1.2K",
		"Completed Surveys": "700",
		"Pending Surveys": "256",
		"Average survey time": "20m"
	}

	return (
		<div className="grid grid-cols-4 gap-2 w-3/4 m-auto">
			{Object.keys(mainMetrics).map(metric =>
				<div
					key={metric}
					className="bg-primary text-text shadow-lg p-1 rounded-lg"
				>
					<div className="text-md">{metric}:</div>
					<div className="float-right text-3xl mt-1 font-bold">
						{mainMetrics[metric]}
					</div>
				</div>
			)}
		</div>
	)
}