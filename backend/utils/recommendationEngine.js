export function recommendInternships(user, internships) {
  const userSkills = user.skills.map(s => s.toLowerCase());

  return internships
    .map(job => {
      let score = 0;
      if (job.sector === user.sector) score += 2;
      if (job.location.toLowerCase() === user.location.toLowerCase()) score += 2;
      const matchedSkills = (job.skills_required || []).filter(sk =>
        userSkills.includes(sk.toLowerCase())
      );
      score += matchedSkills.length;
      return { ...job._doc, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}
