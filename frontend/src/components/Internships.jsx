import { useEffect, useState } from "react";
import axios from "axios";

function InternshipList() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://internships-api.p.rapidapi.com/internships',
      params: { location: 'India', page: '1' },
      headers: {
        'X-RapidAPI-Host': 'internships-api.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    };

    axios.request(options)
      .then(response => {
        console.log(response.data);  // check the API response
        setInternships(response.data); // may need to use response.data.data depending on API
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Internship Recommendations</h1>
      {internships.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        <ul>
          {internships.map((internship, index) => (
            <li key={index}>
              <strong>{internship.title}</strong> at {internship.company_name} <br />
              Location: {internship.location} <br />
              <a href={internship.url} target="_blank" rel="noreferrer">Apply Here</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InternshipList;
