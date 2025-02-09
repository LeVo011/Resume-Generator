document.addEventListener("DOMContentLoaded", () => {
    const fullName = document.getElementById("fullName");
    const jobTitle = document.getElementById("jobTitle");
    const summary = document.getElementById("summary");
    const skills = document.getElementById("skills");
  
    const previewName = document.getElementById("previewName");
    const previewJob = document.getElementById("previewJob");
    const previewSummary = document.getElementById("previewSummary");
    const previewSkills = document.getElementById("previewSkills");
  
    function updatePreview() {
      previewName.textContent = fullName.value || "Your Name";
      previewJob.textContent = jobTitle.value || "Job Title";
      previewSummary.textContent = summary.value || "Your professional summary will appear here.";
  
      const skillsArray = skills.value.split(",").map(skill => skill.trim()).filter(skill => skill);
      previewSkills.innerHTML = "";
      if (skillsArray.length) {
        skillsArray.forEach(skill => {
          const li = document.createElement("li");
          li.textContent = skill;
          previewSkills.appendChild(li);
        });
      } else {
        previewSkills.innerHTML = "<li>Skill 1</li><li>Skill 2</li>";
      }
    }
  
    fullName.addEventListener("input", updatePreview);
    jobTitle.addEventListener("input", updatePreview);
    summary.addEventListener("input", updatePreview);
    skills.addEventListener("input", updatePreview);
  
    document.getElementById("resumeForm").addEventListener("submit", (e) => {
      e.preventDefault();
      updatePreview();
    });
  
    document.getElementById("downloadBtn").addEventListener("click", () => {
      const element = document.getElementById("resumePreview");
      const clone = element.cloneNode(true);
      clone.style.background = "#ffffff";
      clone.style.color = "#000000";
      clone.querySelectorAll("h1, h3, p, li").forEach(el => {
        el.style.color = "#000000";
      });
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-10000px";
      container.appendChild(clone);
      document.body.appendChild(container);
  
      const opt = {
        margin: 0.5,
        filename: 'My_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff" },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      html2pdf(clone, opt)
        .then(() => {
          document.body.removeChild(container);
          console.log("PDF generated successfully!");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    });
  });
  