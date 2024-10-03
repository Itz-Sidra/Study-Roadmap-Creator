const nextButton = document.getElementById('nextButton');
const taskInputPage = document.getElementById('taskInputPage');
const studentInfoPage = document.getElementById('studentInfoPage');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const copyButton = document.getElementById('copyButton');
const emailButton = document.getElementById('emailButton');
const shareButton = document.getElementById('shareButton');

let tasks = [];

// Request notification permission
if (Notification.permission === 'default' || Notification.permission === 'denied') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.log('Notification permission denied.');
        }
    });
}

// Go to task input page
nextButton.addEventListener('click', () => {
    studentInfoPage.style.display = 'none';
    taskInputPage.style.display = 'block';
});

// Add task
addTaskBtn.addEventListener('click', () => {
    const subjectInput = document.getElementById('subject').value;
    const taskInput = document.getElementById('task').value;
    const deadlineInput = document.getElementById('deadline').value;
    const resourceInput = document.getElementById('resource').value;

    if (subjectInput && taskInput && deadlineInput) {
        const task = { subject: subjectInput, name: taskInput, deadline: deadlineInput, resource: resourceInput, completed: false };
        tasks.push(task);
        displayTasks();
        updateProgress();
        scheduleNotifications(); // Schedule notification for the new task
        document.getElementById('subject').value = '';
        document.getElementById('task').value = '';
        document.getElementById('deadline').value = '';
        document.getElementById('resource').value = '';
    }
});

// Schedule notifications
function scheduleNotifications() {
    tasks.forEach(task => {
        const taskDeadline = new Date(task.deadline).getTime();
        const now = Date.now();
        const oneDayBefore = taskDeadline - (24 * 60 * 60 * 1000); // 1 day in milliseconds

        if (oneDayBefore > now) {
            const timeUntilNotification = oneDayBefore - now;
            setTimeout(() => {
                showNotification(task.subject, task.name, task.deadline);
            }, timeUntilNotification);
        }
    });
}

// Show notification
function showNotification(subject, taskName, deadline) {
    if (Notification.permission === 'granted') {
        new Notification(`Reminder: ${taskName}`, {
            body: `The deadline for ${subject} is tomorrow! (${deadline})`,
        });
    }
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = ''; // Clear the previous list
    document.getElementById('roadmap').innerHTML = ''; // Clear the roadmap div
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by deadline

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item'); // Apply the pink box styling

        taskDiv.innerHTML = `
            <h3>${task.subject}</h3>
            <p><strong>Task:</strong> ${task.name}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            ${task.resource ? `<a href="${task.resource}" target="_blank">Resource Link</a>` : ''}
            <label><input type="checkbox" class="task-complete" data-index="${index}"> Mark as complete</label>
        `;
        document.getElementById('roadmap').appendChild(taskDiv);
    });

    // Add event listeners for the checkboxes
    document.querySelectorAll('.task-complete').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const index = this.dataset.index;
            tasks[index].completed = this.checked;
            updateProgress();
        });
    });
}

// Update progress
function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressFill.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
}

// Copy to Clipboard
copyButton.addEventListener('click', () => {
    const textToCopy = tasks.map(task => `${task.subject}: ${task.name} - Deadline: ${task.deadline}`).join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Study plan copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

// Email Sharing
emailButton.addEventListener('click', () => {
    const subject = "My Study Plan";
    const body = encodeURIComponent(tasks.map(task => `${task.subject}: ${task.name} - Deadline: ${task.deadline} - Resource: ${task.resource}`).join('\n'));
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
});

// Web Share API
if (navigator.share) {
    shareButton.addEventListener('click', () => {
        const shareText = tasks.map(task => `${task.subject}: ${task.name} - Deadline: ${task.deadline} - Resource: ${task.resource}`).join('\n');
        navigator.share({
            title: 'My Study Plan',
            text: shareText,
            url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    });
} else {
    console.log('Web Share API not supported.');
}