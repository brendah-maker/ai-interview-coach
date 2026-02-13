<script>
const prepareBtn = document.getElementById('prepareBtn');
const aiResponse = document.getElementById('aiResponse');
const questionsDiv = document.getElementById('questions');

prepareBtn.addEventListener('click', () => {

  const position = document.getElementById('position').value;
  const jobDesc = document.getElementById('jobDescription').value.toLowerCase();

  if(!position && !jobDesc) {
    alert('Please select a position or paste a job description!');
    return;
  }

  // Detect key skills from job description
  const detectedSkills = [];

  if(jobDesc.includes("python")) detectedSkills.push("Python");
  if(jobDesc.includes("sql")) detectedSkills.push("SQL");
  if(jobDesc.includes("communication")) detectedSkills.push("Communication");
  if(jobDesc.includes("leadership")) detectedSkills.push("Leadership");
  if(jobDesc.includes("sales")) detectedSkills.push("Sales Ability");
  if(jobDesc.includes("analysis")) detectedSkills.push("Analytical Thinking");
  if(jobDesc.includes("agile")) detectedSkills.push("Agile Methodology");
  if(jobDesc.includes("customer")) detectedSkills.push("Customer Focus");
  if(jobDesc.includes("excel")) detectedSkills.push("Excel");
  if(jobDesc.includes("javascript")) detectedSkills.push("JavaScript");

  const skillsOutput = detectedSkills.length > 0
    ? detectedSkills.join(", ")
    : "General professional competencies";

  // Interviewer expectations
  const expectations = `
    <div class="bg-white p-4 rounded-lg shadow">
      <h4 class="font-bold text-blue-600 mb-2">What Interviewers Expect</h4>
      <ul class="list-disc ml-6 space-y-1">
        <li>Clear understanding of the role requirements</li>
        <li>Demonstration of relevant skills (${skillsOutput})</li>
        <li>Problem-solving ability</li>
        <li>Strong communication skills</li>
        <li>Evidence of past impact and results</li>
      </ul>
    </div>
  `;

  // Sample questions with guidance
  const questions = [
    {
      question: `Tell me about yourself and your experience related to ${position || "this role"}.`,
      guidance: "Structure your answer using Present → Past → Future. Focus on achievements aligned with the job description."
    },
    {
      question: "Why are you interested in this role?",
      guidance: "Connect your career goals with the company’s mission. Mention how your skills match their needs."
    },
    {
      question: "Describe a challenge you faced and how you solved it.",
      guidance: "Use the STAR method: Situation, Task, Action, Result. Quantify results where possible."
    },
    {
      question: "What are your key strengths?",
      guidance: `Highlight strengths related to ${skillsOutput}. Provide examples, not just claims.`
    }
  ];

  const questionsHTML = questions.map(q => `
    <div class="bg-white p-4 rounded-lg shadow">
      <p class="font-semibold text-gray-800 mb-2">${q.question}</p>
      <p class="text-sm text-gray-600"><strong>How to answer:</strong> ${q.guidance}</p>
    </div>
  `).join("");

  questionsDiv.innerHTML = `
    ${expectations}

    <div class="bg-blue-50 p-4 rounded-lg shadow mt-4">
      <h4 class="font-bold text-blue-600 mb-2">Key Skills Detected</h4>
      <p>${skillsOutput}</p>
    </div>

    <div class="mt-6 space-y-4">
      <h4 class="font-bold text-gray-800">Likely Interview Questions & How to Answer</h4>
      ${questionsHTML}
    </div>
  `;

  aiResponse.classList.remove('hidden');
});
</script>
