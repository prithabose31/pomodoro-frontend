# FocusFlow User Guide

## 1. Getting Started

Open:

https://focusflowapp.up.railway.app

Create an account from the Sign Up page.

After registration, log in and you will be taken into the productivity
application.

## 2. Home Dashboard

The Home page gives you an overview of your current productivity.

It includes:

-   Today's date and greeting
-   Quick access to the Task Board
-   Quick access to the Pomodoro Timer
-   Quick access to Categories
-   Total task count
-   Tasks currently in progress
-   Tasks completed
-   Total focus time
-   Weekly progress toward your planned focus goal
-   Active tasks

The Home page can also open the weekly planning flow.

## 3. Categories

Open **Categories** to organize your work.

You can:

-   Create a category
-   Give it a name
-   Add a description
-   Choose an emoji
-   Choose a color
-   Edit a category
-   Delete a category
-   Open a category to see its associated tasks

Categories are useful for grouping related work.

## 4. Category Details

Open a category from the Categories page.

The category detail page shows:

-   Category information
-   Tasks belonging to the category
-   Task statuses
-   Time spent
-   Weekly goals
-   Overall category progress

You can create and edit tasks directly from the category page.

Deleting a category does not delete its tasks according to the current
UI behavior.

## 5. Task Board

The Task Board organizes tasks into five statuses:

``` text
New
Backlog
In Progress
On Hold
Done
```

You can:

-   Create a task
-   Edit a task
-   Delete a task
-   Assign a category
-   Add subtasks
-   Set a weekly goal
-   Track time spent
-   View tasks by status

The board also provides a **Plan Week** action.

## 6. Weekly Planning

Use **Plan Week** to set weekly focus goals for your tasks.

For each task, you can specify the number of minutes you want to spend
on it during the week.

Focus time logged against tasks contributes to the progress shown on the
Home page and category pages.

## 7. Pomodoro Timer

Open **Pomodoro Timer** to start a focus session.

Before starting:

1.  Select a task.
2.  Configure work duration.
3.  Configure break duration.
4.  Configure the number of cycles.

The timer supports:

-   Start
-   Pause
-   Resume
-   Stop
-   Skip
-   Multiple work/break cycles

A task must be selected before a session can be started.

## 8. Pomodoro Session Logging

Completed focus sessions are sent to the backend and associated with the
selected task when applicable.

The application records information such as:

-   Work duration
-   Break duration
-   Completed cycles
-   Total minutes logged

Logged focus time is reflected in task productivity information.

## 9. Notifications and Sounds

The Pomodoro page requests browser notification permission when needed.

The application can provide:

-   Work-session completion sounds
-   Break completion sounds
-   Completion notification when all cycles finish
-   Browser notifications for session transitions

If browser notifications are disabled, the timer itself continues to
function.

## 10. Music Player

The music player appears at the bottom of authenticated application
pages.

You can:

-   Open the player
-   Select ambient playlists
-   Search YouTube
-   Play a selected track
-   Collapse the player
-   Stop the current track

The music player is global rather than page-specific.

When the player is collapsed, the YouTube iframe remains mounted so the
current audio can continue while navigating between application pages.

## 11. Authentication

Use:

**Sign Up** to create a new account.

**Login** to sign in.

**Logout** to end the session.

Authentication state is maintained using secure cookies managed by the
backend.

## 12. Recommended First-Time Workflow

A simple workflow for a new user:

1.  Create an account.
2.  Create a few categories.
3.  Add your tasks.
4.  Add subtasks where useful.
5.  Set weekly goals.
6.  Open the Pomodoro page.
7.  Select a task.
8.  Configure your work/break cycle.
9.  Start a focus session.
10. Review your progress from the Home dashboard.

## 13. Troubleshooting

### I cannot log in

Check that the backend is available and that your browser allows
cookies.

### My tasks are not loading

Refresh the page and verify that you are logged in. Task APIs require an
authenticated user.

### Notifications do not appear

Check browser notification permissions for the FocusFlow site.

### Music is not playing

Check browser autoplay/media permissions and make sure a track has been
selected.

### My timer looks different after switching browser tabs

The timer calculates remaining time from a target timestamp rather than
relying only on interval ticks, so it is designed to stay synchronized
even when browser timers are delayed.
