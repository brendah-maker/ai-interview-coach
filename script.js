document.addEventListener("DOMContentLoaded", function () {

  const prepareBtn = document.getElementById("prepareBtn");
  const aiResponse = document.getElementById("aiResponse");
  const loading = document.getElementById("loading");

  prepareBtn.addEventListener("click", handleGenerate);

  // ======================================
  // Main Handler
  // ======================================
  function handleGenerate() {

    const position = document.getElementById("position").value;
    const jobDesc = document.getElementById("jobDescription").value.toLowerCase();
    const fileInput = document.getElementById("cvUpload");

    if (!position && !jobDesc && fileInput.files.length === 0) {
      alert("Please select a position, paste a job description, or upload a CV.");
      return;
    }

    aiResponse.classList.add("hidden");
    loading.classList.remove("hidden");

    if (fileInput.files.length > 0) {
      readCV(fileInput.files[0], position, jobDesc);
    } else {
      processData(position, jobDesc, "");
    }
  }

  // ======================================
  // Read CV (TXT supported safely)
  // ======================================
  function readCV(file, position, jobDesc) {

    if (!file.type.includes("text")) {
      processData(position, jobDesc, "");
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const cvText = e.target.result.toLowerCase();
      processData(position, jobDesc, cvText);
    };

    reader.readAsText(file);
  }

  // ======================================
  // Core Processing
  // ======================================
  function processData(position, jobDesc, cvText) {

    setTimeout(function () {

      const combinedText = jobDesc + " " + cvText;
      const skills = detectSkills(combinedText);

      const expectationsHTML = generateExpectations(skills);
      const questionsHTML = generateQuestions(position, skills);

      aiResponse.innerHTML = expectationsHTML + questionsHTML;

      loading.classList.add("hidden");
      aiResponse.classList.remove("hidden");

    }, 1000);
  }

  // ======================================
  // Smarter Skill Detection
  // ======================================
  function detectSkills(text) {

    const keywordGroups = {
      technical: ["python", "sql", "excel", "javascript", "react", "node"],
      soft: ["leadership", "communication", "teamwork", "problem solving"],
      business: ["sales", "marketing", "finance", "analysis", "management"],
      agile: ["agile", "scrum", "kanban"],
      customer: ["customer", "support", "service"]
    };

    let detected = [];

    Object.values(keywordGroups).forEach(group => {
      group.forEach(keyword => {
        if (text.includes(keyword) && !detected.includes(keyword)) {
          detected.push(keyword);
        }
      });
    });

    return detected;
  }

  // ======================================
  // Expectations Section
  // ======================================
  function generateExpectations(skills) {

    const dynamicSkills = skills.length
      ? skills.map(s => `<li>${capitalize(s)}</li>`).join("")
      : "<li>Relevant professional competencies</li>";

    return `
      <div class="bg-white p-6 rounded-xl shadow mb-6">
        <h3 class="text-xl font-bold text-blue-600 mb-3">
          What Interviewers Expect
        </h3>
        <ul class="list-disc ml-6 space-y-1 text-gray-700">
          <li>Clear understanding of responsibilities</li>
          <li>Results-driven mindset</li>
          <li>Structured communication</li>
          <li>Evidence of measurable achievements</li>
          ${dynamicSkills}
        </ul>
      </div>
    `;
  }

  // ======================================
  // Question Generator
  // ======================================
  function generateQuestions(position, skills) {

    const role = position || "this role";
    const skillsText = skills.length
      ? skills.map(s => capitalize(s)).join(", ")
      : "your professional strengths";

    let roleSpecificQuestions = generateRoleSpecific(position);

    return `
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          Likely Interview Questions & Sample Answers
        </h3>

        ${questionBlock(
          `Tell me about yourself as it relates to ${role}.`,
          "Use Present → Past → Future structure.",
          generateDynamicIntro(role, skillsText)
        )}

        ${questionBlock(
          "Why are you interested in this role?",
          "Connect your skills to the company's needs.",
          `This role strongly aligns with my background in ${skillsText}. I am motivated by opportunities where I can contribute impact while continuing to grow professionally.`
        )}

        ${questionBlock(
          "Describe a challenge you solved.",
          "Use the STAR method (Situation, Task, Action, Result).",
          `In my previous role, I faced a challenge related to ${skillsText}. I analyzed the situation, implemented structured solutions, and collaborated effectively. As a result, we improved efficiency and achieved measurable success.`
        )}

        ${roleSpecificQuestions}

      </div>
    `;
  }

  // ======================================
  // Role-Specific Questions
  // ======================================
  function generateRoleSpecific(position) {

    if (!position) return "";

    switch (position) {

      case "Data Analyst":
        return questionBlock(
          "How do you ensure data accuracy?",
          "Explain validation and cross-checking processes.",
          "I ensure data integrity by cleaning datasets, validating sources, and cross-referencing outputs before presenting insights."
        );

      case "Frontend Developer":
        return questionBlock(
          "How do you optimize website performance?",
          "Discuss lazy loading, code splitting, optimization.",
          "I improve performance by minimizing bundle sizes, using lazy loading, and optimizing images and assets."
        );

      case "Customer Support":
        return questionBlock(
          "How do you handle difficult customers?",
          "Show empathy and solution-focused thinking.",
          "I remain calm, actively listen, and focus on resolving the issue efficiently while maintaining a positive customer experience."
        );

      default:
        return "";
    }
  }

  // ======================================
  // Question Block Template
  // ======================================
  function questionBlock(question, guidance, example) {
    return `
      <div class="bg-white p-6 rounded-xl shadow mb-4">
        <p class="font-semibold text-gray-800 mb-2">${question}</p>

        <p class="text-sm text-blue-600 mb-2">
          <strong>How to answer:</strong> ${guidance}
        </p>

        <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
          <strong>Example Response:</strong>
          <p class="mt-2">${example}</p>
        </div>
      </div>
    `;
  }

  // ======================================
  // Dynamic Intro Generator
  // ======================================
  function generateDynamicIntro(role, skillsText) {

    const intros = [
      `I am a results-oriented professional with experience in ${skillsText}. Throughout my career, I have applied these strengths to deliver measurable impact. I am now excited to bring that value into a ${role} position.`,
      `My background includes hands-on experience in ${skillsText}. I’ve consistently focused on delivering results and continuous improvement, and I see this ${role} role as a strong next step.`,
      `With a foundation in ${skillsText}, I have built a track record of solving problems and improving outcomes. I’m eager to apply that experience in this ${role} opportunity.`
    ];

    return intros[Math.floor(Math.random() * intros.length)];
  }

  // ======================================
  // Helper
  // ======================================
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

});
