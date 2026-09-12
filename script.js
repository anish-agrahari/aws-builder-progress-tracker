const skills = [
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


let projects = [
    {
        name: "AWS Builder Progress Tracker",
        status: "In Development"
    }
];


function renderSkills() {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach((skill, index) => {

        const div = document.createElement("div");

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

            renderSkills();

            updateProgress();
        };

        container.appendChild(div);
    });
}


function updateProgress() {

    const completed =
        skills.filter(skill => skill.completed).length;

    const total = skills.length;

    const percentage =
        Math.round((completed / total) * 100);

    document.getElementById(
        "progressPercentage"
    ).textContent = `${percentage}%`;

    document.getElementById(
        "progressFill"
    ).style.width = `${percentage}%`;

    document.getElementById(
        "skillCount"
    ).textContent =
        `${completed} / ${total} completed`;


    let message = "Start your AWS journey 🚀";

    if (percentage === 100) {
        message = "AWS journey milestone completed! 🎉";
    }
    else if (percentage >= 75) {
        message = "Almost there! Keep building 🔥";
    }
    else if (percentage >= 50) {
        message = "You're making great progress 💪";
    }
    else if (percentage > 0) {
        message = "Great start! Keep learning 🚀";
    }

    document.getElementById(
        "progressText"
    ).textContent = message;
}


function renderProjects() {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach((project, index) => {

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
    });
}


function addProject() {

    const input =
        document.getElementById("projectInput");

    const name =
        input.value.trim();

    if (!name) {
        return;
    }

    projects.push({
        name: name,
        status: "In Development"
    });

    input.value = "";

    renderProjects();
}


function deleteProject(index) {

    projects.splice(index, 1);

    renderProjects();
}


/* Initial render */

renderSkills();

renderProjects();

updateProgress();