document.addEventListener("DOMContentLoaded", function () {

  const prepareBtn = document.getElementById("prepareBtn");
  const aiResponse = document.getElementById("aiResponse");
  const loading = document.getElementById("loading");

  prepareBtn.addEventListener("click", function () {

    const position = document.getElementById("position").value;
    const jobDesc = document.getElementById("jobDescription").value.toLowerCase();
    const cvText = document.getElementById("cvText").value.toLowerCase();

    if (!position && !jobDesc && !cvText) {
      alert("Please provide job description or CV content.");
      return;
    }

    aiResponse.classList.add("hidden");
    loading.classList.remove("hidden");

    setTimeout(function () {

      const combinedText = jobDesc + " " + cvText;
      const skills = detectSkills(combinedText);

      const expectationsHTML = generateExpectations(skills);
      const questionsHTML = generateQuestions(position, skills);

      aiResponse.innerHTML = expectationsHTML + questionsHTML;

      loading.classList.add("hidden");
      aiResponse.classList.remove("hidden");

    }, 1000);

  });


  // ==========================
  // Skill Detection
  // ==========================
  function detectSkills(text) {

    const keywords = [
      "python", "sql", "excel", "leadership",
      "communication", "sales", "analysis",
      "agile", "customer", "javascript",
      "react", "node", "finance",
      "marketing", "management"
    ];

    return keywords.filter(word => text.includes(word));
  }


  // ==========================
  // Interview Expectations
  // ==========================
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
          <li>Clear understanding of role responsibilities</li>
          <li>Strong problem-solving ability</li>
          <li>Evidence of measurable impact</li>
          <li>Confidence and structured communication</li>
          ${skillsList}
        </ul>
      </div>
    `;
  }


  // ==========================
  // Question + Sample Answers
  // ==========================
  function generateQuestions(position, skills) {

    const role = position || "this role";
    const skillsText = skills.length > 0
      ? skills.map(s => capitalize(s)).join(", ")
      : "your professional skills";

    return `
      <div>
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          Likely Interview Questions & Example Answers
        </h3>

        ${questionBlock(
          `Tell me about yourself in relation to ${role}.`,
          `Structure your answer: Present → Past → Future.`,
          `I am a professional with experience in ${skillsText}. In my previous roles, I applied these skills to deliver measurable results. For example, I improved processes and collaborated with cross-functional teams to achieve performance targets. I am now looking to apply my expertise to contribute meaningfully in this ${role} position.`
        )}

        ${questionBlock(
          "Why are you interested in this role?",
          "Align your skills with company needs.",
          `I am interested in this role because it aligns with my background in ${skillsText}. The responsibilities outlined in the job description match my experience, and I am motivated to contribute value while continuing to grow professionally.`
        )}

        ${questionBlock(
          "Describe a challenge you faced and how you solved it.",
          "Use the STAR method.",
          `In my previous role, I faced a challenge related to ${skillsText}. (Situation) I was responsible for resolving it. (Task) I implemented structured solutions and collaborated with stakeholders. (Action) As a result, we achieved improved efficiency and measurable performance gains. (Result)`
        )}

        ${questionBlock(
          "What are your key strengths?",
          "Provide examples, not just claims.",
          `My key strengths include ${skillsText}. For instance, I demonstrated strong performance by applying these skills to deliver impactful results in my previous role.`
        )}

      </div>
    `;
  }


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


  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

});
