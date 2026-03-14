export function generateSummaries(data) {

  const {
    targetJobTitle,
    experienceLevel,
    yearsOfExperience,
    currentRole,
    keySkills,
    jobDescription
  } = data;

  const role = currentRole || targetJobTitle;

  const skills = keySkills
    ? keySkills.split(",").map(s => s.trim()).join(", ")
    : "modern software development tools";

  const experienceText = yearsOfExperience
    ? `${yearsOfExperience} of experience`
    : `${experienceLevel.toLowerCase()} level experience`;



  // VERSION 1 (Balanced)
  const version_1 =
`${experienceLevel} ${targetJobTitle} with ${experienceText} working as ${role}. Skilled in ${skills} with a strong focus on building efficient and scalable applications. Passionate about solving complex problems and delivering reliable software solutions.`;


  // VERSION 2 (Technical)
  const version_2 =
`Technically focused ${targetJobTitle} experienced in ${skills}. Strong understanding of modern development practices, system architecture, and performance optimization. Adept at collaborating with teams to design and implement high-quality applications.`;


  // VERSION 3 (Impact / Achievement)
  const version_3 =
`Results-driven ${targetJobTitle} known for leveraging ${skills} to build impactful solutions. Proven ability to improve system efficiency, solve challenging technical problems, and contribute to high-performing engineering teams.`;


  return {
    version_1,
    version_2,
    version_3
  };

}