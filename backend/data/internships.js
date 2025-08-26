import { useState, useEffect } from 'react';

function useInternships() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch('https://api.internshala.com/internships');
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  return internships;
}
