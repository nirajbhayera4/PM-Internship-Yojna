export default function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-gray-500">No recommendations yet.</p>;
  }

  return (
    <div className="space-y-4">
      {recommendations.map((job, index) => (
        <div key={index} className="p-4 bg-gray-50 border rounded-md shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg">{job.title}</h3>
          <p className="text-gray-600">{job.company_name}</p>
          <p className="text-gray-500">{job.location}</p>
          {job.url && (
            <a href={job.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Apply Here
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
