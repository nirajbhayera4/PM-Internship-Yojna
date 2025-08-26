export default function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-gray-500">No recommendations yet. Submit your details!</p>;
  }

  return (
    <ul className="space-y-4">
      {recommendations.map((rec, index) => (
        <li
          key={index}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{rec.title}</h3>
          <p className="text-gray-600">{rec.company_name}</p>
          <p className="text-sm text-gray-500">{rec.location}</p>
          <a
            href={rec.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Apply Now →
          </a>
        </li>
      ))}
    </ul>
  );
}
