# Study Roadmap Creator

**Overview**
The Study Roadmap Creator is a web-based application designed to help students create visual study plans. It allows students to break down subjects into tasks, track progress, add resource links, share their plans easily and manage deadlines. The application features a user-friendly interface with a pastel color palette, optimized for both desktop and mobile use.

## Features

- **Student Information Page**: Collects student details like name, email, and phone number.
- **Task Management**: Allows users to input tasks with subjects, deadlines, and add resource links.
- **Task Sorting**: Automatically sorts tasks by their deadlines (earliest first).
- **Progress Tracking**: Displays a progress bar and percentage that update as tasks are completed.
- **Task Completion**: Mark tasks as complete and see instant progress updates.
- **Resource Links**: Each task has an associated resource link that can be opened.
- **Copy Study Plan**: Easily copy the study plan to your clipboard for sharing.
- **Email Study Plan**: Send the study plan via email.
- **Web Share API**: Share the study plan via supported devices with the Web Share API.
- **Browser Notifications**: Sends a browser notification one day before a task's deadline (after permission is granted).
- **Responsive Design**: Uses a pastel color scheme with a user-friendly layout.

## Browser Notification
The application uses the Browser Notification API to send notifications to remind users of upcoming deadlines. Notifications are triggered one day before a task is due.

**How it works:**
 - **Permission Request**: When you first use the app, you will be asked to allow notifications from the browser.
   Notifications will only work if permission is granted.
 - **One Day Reminder**: A notification will pop up 24 hours before the task's deadline as a reminder.
 - **Supported Browsers**: The notification feature works in modern browsers like Chrome, Firefox, Edge, and Safari. For
   mobile, it also works on browsers that support the Notification API.
   
## How to Use

1. **Enter Student Information**: Fill in your name, email, and phone number, then proceed to the task input section.
2. **Add Tasks**: Input the subject, task, deadline, and any resource links.
3. **Track Progress**: As you complete tasks, mark them as done, and your progress will be updated automatically.
4. **Share Your Study Plan**:
    - Copy it to the clipboard for quick sharing.
    - Send it to your email.
    - Use the Web Share API on supported devices.
      
## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling for the application with a user-friendly, pastel color scheme.
- **JavaScript**: Handles task management, progress tracking, and sharing features.

## Color Palette
The colors used in the Study Roadmap Creator were carefully selected to create a calm, focused, and user-friendly experience. The pastel tones help reduce eye strain while maintaining a visually appealing interface.
- Pastel Blue: `#84b6e3`
- Blue: `538ce6`
- Darker Blue: `0d76d2`
- Dark Blue: `#4a4a8d`
- Light Pink: `#fce4ec`
- Light Gray: `#eee`
- Medium Gray: `#ccc`
- Very Light Gray: `#f9f9f9`
- White: `#FFFFFF`

## Demo
You can access the live demo here: https://itz-sidra.github.io/Study-Roadmap-Creator/
