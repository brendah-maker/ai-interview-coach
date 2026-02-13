const prepareBtn = document.getElementById('prepareBtn');
const aiResponse = document.getElementById('aiResponse');
const loading = document.getElementById('loading');

prepareBtn.addEventListener('click', () => {

  const position = document.getElementById('position').value;
  const jobDesc = document.getElementById('jobDescription').value.toLowerCase();

  if (!position && !jobDesc) {
    alert("Please select a position or paste a job description.");
    return;
  }

  aiResponse.classList.add("hidden");
  loading.classList.remove("hidden");

  setTimeout(() => {

    const skills = detectSkills(jobDesc);
    const expectationsHTML = generateExpectations(skills);
    const questionsHTML = generateQuestions(position, skills);

    aiResponse.innerHTML = `
      ${expectationsHTML}
      ${questionsHTML}
    `;

    loading.classList.add("hidden");
    aiResponse.classList.remove("hidden");

  }, 1200);
});


function detectSkills(text) {
  const keywords = [
    "python", "sql", "excel", "leadership", "communication",
    "sales", "analysis", "agile", "customer", "javascript",
    "react", "node", "finance", "marketing"
  ];

  return keywords.filter(word => text.includes(word));
}


function generateExpectations(skills) {

  const skillsList = skills.length > 0
    ? skills.map(s => `<li>${capitalize(s)}</li>`).join("")
    : "<li>General professional competencies</li>";

  return `
    <div class="bg-white p-6 rounded-xl shadow mb-6">
      <h3 class="text-xl font-bold text-blue-600 mb-3">
        What Interviewers Expect
      </h3>
      <ul class="list-disc ml-6 space-y-1 text-gray-700">
        <li>Clear understanding of the role</li>
        <li>Strong problem-solving skills</li>
        <li>Demonstrated impact in past roles</li>
        <li>Effective communication</li>
        ${skillsList}
      </ul>
    </div>
  `;
}


function generateQuestions(position, skills) {

  const role = position || "this role";
  const skillsText = skills.length > 0
    ? skills.map(s => capitalize(s)).join(", ")
    : "relevant professional skills";

  const questions = [
    {
      q: `Tell me about yourself in relation to ${role}.`,
      a: "Use Present → Past → Future. Highlight measurable achievements."
    },
    {
      q: `Why are you interested in ${role}?`,
      a: "Align your career goals with company objectives."
    },
    {
      q: "Describe a challenge you solved.",
      a: "Use the STAR method (Situation, Task, Action, Result)."
    },
    {
      q: "What are your strengths?",
      a: `Focus on ${skillsText} and provide real examples.`
    }
  ];

  const html = questions.map(item => `
    <div class="bg-white p-6 rounded-xl shadow mb-4">
      <p class="font-semibold text-gray-800 mb-2">${item.q}</p>
      <p class="text-sm text-gray-600">
        <strong>How to answer:</strong> ${item.a}
      </p>
    </div>
  `).join("");

  return `
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        Likely Interview Questions
      </h3>
      ${html}
    </div>
  `;
}


function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
