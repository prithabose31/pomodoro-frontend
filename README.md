# FocusFlow --- Frontend

FocusFlow is a full-stack productivity application built around task
management, weekly planning, Pomodoro focus sessions, and ambient music.

This repository contains the React + Vite frontend.

## Live Application

**Live app:** https://focusflowapp.up.railway.app

## Related Repository

**Backend:** https://github.com/prithabose31/pomodoro-backend

## Features

-   User registration and login
-   Cookie-based authentication flow with access and refresh tokens
-   Home dashboard with productivity statistics
-   Task board with status-based columns
-   Task creation, editing, and deletion
-   Subtasks
-   Task categories with custom emoji and color
-   Category detail pages
-   Weekly planning and weekly task goals
-   Pomodoro timer with configurable:
    -   Work duration
    -   Break duration
    -   Number of cycles
-   Task-linked Pomodoro sessions
-   Focus-time tracking
-   Browser notifications and timer sounds
-   Pomodoro history
-   Persistent music player across logged-in pages
-   Ambient playlists
-   YouTube search and playback
-   Responsive warm-pastel UI

## Tech Stack

-   React 19
-   Vite
-   React Router
-   Zustand
-   Axios
-   Tailwind CSS
-   YouTube embedded player / YouTube Data API integration
-   Railway for deployment

The frontend package configuration defines Vite development/build
scripts and uses React, React Router, Zustand, Axios, and Tailwind CSS.

## Application Structure

``` text
src/
├── components/
│   ├── categories/
│   ├── layout/
│   ├── music/
│   ├── tasks/
│   └── timer/
├── hooks/
├── pages/
│   ├── Login
│   ├── SignUp
│   ├── Home
│   ├── Categories
│   ├── CategoryDetail
│   ├── TaskBoard
│   └── Pomodoro
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── categoryService.js
│   ├── taskService.js
│   └── pomodoroService.js
├── store/
└── App.jsx
```

## Main Routes

  Route               Purpose
  ------------------- ----------------------------
  `/login`            Login
  `/signup`           Create an account
  `/home`             Productivity dashboard
  `/categories`       Manage categories
  `/categories/:id`   View and manage a category
  `/tasks`            Task board
  `/pomodoro`         Pomodoro timer

The application routing and the global music player are defined in
`src/App.jsx`.

## API Configuration

The frontend uses Axios with:

``` text
VITE_API_BASE_URL
```

The API client appends `/api` automatically.

Example local `.env`:

``` env
VITE_API_BASE_URL=https://localhost:7252
```

For production, configure `VITE_API_BASE_URL` in the deployment
environment rather than committing environment files.

## Local Development

### Prerequisites

-   Node.js
-   npm
-   Running FocusFlow backend

### Install dependencies

``` bash
npm install
```

### Configure the API

Create a local `.env` file:

``` env
VITE_API_BASE_URL=https://localhost:7252
```

### Start development server

``` bash
npm run dev
```

### Production build

``` bash
npm run build
```

### Lint

``` bash
npm run lint
```

## Timer Design

The timer stores the target end time rather than relying only on
repeated interval decrements. It calculates remaining time from
`Date.now()`, allowing the displayed timer to remain synchronized when
the browser tab is backgrounded or the interval is delayed.

The timer supports:

-   Start
-   Pause
-   Resume
-   Stop
-   Skip
-   Multiple work/break cycles
-   Session completion callbacks
-   Logging completed focus time to the backend

## Music Player

The music player is mounted globally for authenticated application
pages.

The YouTube iframe remains mounted while the player is collapsed and is
hidden using CSS rather than being unmounted. This allows the current
audio to continue while navigating through the application.

## Deployment

The frontend is deployed on Railway and connected to the `main` branch
of the GitHub repository.

Production environment variables are configured in Railway.

## Notes

Do not commit `.env` or `.env.production` files. The repository's
`.gitignore` excludes environment files.
