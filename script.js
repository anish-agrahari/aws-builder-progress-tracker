// ===============================
// AWS BUILDER PROGRESS TRACKER
// ===============================


// ---------- Skills ----------

const defaultSkills = [
    {
        name: "AWS Cloud Basics",
        completed: false
    },
    {
        name: "Amazon S3",
        completed: false
    },
    {
        name: "AWS Lambda",
        completed: false
    },
    {
        name: "Amazon API Gateway",
        completed: false
    },
    {
        name: "Amazon DynamoDB",
        completed: false
    },
    {
        name: "Amazon Bedrock",
        completed: false
    }
];


// Load saved skills from browser
let skills =
    JSON.parse(localStorage.getItem("awsSkills"))
    || defaultSkills;


// ---------- Projects ----------

const defaultProjects = [
    {
        name: "AWS Builder Progress Tracker",
        status: "Deployed on AWS"
    }
];


let projects =
    JSON.parse(localStorage.getItem("awsProjects"))
    || defaultProjects;


// ---------- Save Data ----------

function saveSkills() {

    localStorage.setItem(
        "awsSkills",
        JSON.stringify(skills)
    );
}


function saveProjects() {

    localStorage.setItem(
        "awsProjects",
        JSON.stringify(projects)
    );
}


// ---------- Render Skills ----------

function renderSkills() {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach((skill, index) => {

        const div =
            document.createElement("div");

        div.className =
            `skill ${skill.completed ? "completed" : ""}`;

        div.innerHTML = `
            <div class="skill-top">

                <div class="checkbox">
                    ${skill.completed ? "✓" : ""}
                </div>

                <div class="skill-name">
                    ${skill.name}
                </div>

            </div>
        `;


        div.onclick = () => {

            skills[index].completed =
                !skills[index].completed;

            saveSkills();

            renderSkills();

            updateProgress();
        };


        container.appendChild(div);
    });
}


// ---------- Progress ----------

function updateProgress() {

    const completed =
        skills.filter(
            skill => skill.completed
        ).length;

    const total = skills.length;


    const percentage =
        Math.round(
            (completed / total) * 100
        );


    document.getElementById(
        "progressPercentage"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "progressFill"
    ).style.width =
        `${percentage}%`;


    document.getElementById(
        "skillCount"
    ).textContent =
        `${completed} / ${total} completed`;


    let message =
        "Start your AWS journey 🚀";


    if (percentage === 100) {

        message =
            "AWS journey milestone completed! 🎉";

    } else if (percentage >= 75) {

        message =
            "Almost there! Keep building 🔥";

    } else if (percentage >= 50) {

        message =
            "You're making great progress 💪";

    } else if (percentage > 0) {

        message =
            "Great start! Keep learning 🚀";
    }


    document.getElementById(
        "progressText"
    ).textContent =
        message;
}

// ---------- Add Skill ----------

function addSkill() {

    const input =
        document.getElementById("skillInput");

    const name =
        input.value.trim();

    // Don't add empty skills
    if (!name) {
        return;
    }

    // Prevent duplicate skills
    const alreadyExists =
        skills.some(
            skill =>
                skill.name.toLowerCase() ===
                name.toLowerCase()
        );

    if (alreadyExists) {

        alert("This skill already exists.");

        return;
    }

    // Add new skill
    skills.push({

        name: name,

        completed: false

    });

    // Save to Local Storage
    saveSkills();

    // Clear input
    input.value = "";

    // Update UI
    renderSkills();

    updateProgress();
}


// ---------- Projects ----------

function renderProjects() {

    const container =
        document.getElementById(
            "projectsContainer"
        );

    container.innerHTML = "";


    projects.forEach(
        (project, index) => {

            const div =
                document.createElement("div");

            div.className = "project";


            div.innerHTML = `

                <div>

                    <strong>
                        ${project.name}
                    </strong>

                    <div>

                        <span class="project-status">
                            ${project.status}
                        </span>

                    </div>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteProject(${index})"
                >
                    Delete
                </button>

            `;


            container.appendChild(div);
        }
    );
}


// ---------- Add Project ----------

function addProject() {

    const input =
        document.getElementById(
            "projectInput"
        );


    const name =
        input.value.trim();


    if (!name) {
        return;
    }


    projects.push({

        name: name,

        status: "In Development"

    });


    saveProjects();


    input.value = "";


    renderProjects();
}


// ---------- Delete Project ----------

function deleteProject(index) {

    projects.splice(index, 1);

    saveProjects();

    renderProjects();
}


// ---------- Initial Load ----------

renderSkills();

renderProjects();

updateProgress();