# ☕ COPI - Coffee Story Sharing App

COPI is a minimalist blogsite app **built with React + TypeScript** where users can post, edit, and delete their coffee-related stories.
The interface is clean and inspired by cozy café vibes. It supports pagination, modals for creating/editing, and expandable post previews.

---

## Features

- Responsive and stylish UI (**Tailwind CSS**, **Shadcn**, **Lucide Icons**)
- Create, Read, Update, and Delete coffee stories
- Search stories by title
- Expandable post previews (with “More”/”Less” toggle)
- Modal form for creating and updating posts
- Pagination (3 posts per page)
- Connects to a backend via REST API using **Axios**

---

## Tech Stack

- **React** (TypeScript)
- **Tailwind CSS** (for responsive styling)
- **Shadcn/UI** (UI components)
- **Lucide Icons** (icon set)
- **Axios** (HTTP client)

---

## Project Structure

```plaintext
src/
 ├─ api/            # Axios API functions
 ├─ assets/         # Static assets (images, icons, etc.)
 ├─ components/     # Reusable UI components (StoryCard, StoryModal, SearchBar)
 ├─ lib/            # Library/helper modules
 ├─ types/          # TypeScript types and interfaces
 ├─ utils/          # Helper functions (e.g., date formatting)
 ├─ App.tsx         # Main app component
 ├─ index.css       # Global styles
 ├─ main.tsx        # React DOM rendering
 └─ vite-env.d.ts   # TypeScript environment definitions
```

---

## Backend API must respond to:

The backend API must implement the following endpoints:
| Method | Endpoint | Description |
| ------ | ---------------- | ------------------------- |
| GET | `/api/posts` | Fetch all coffee stories |
| POST | `/api/posts` | Create a new coffee story |
| PATCH | `/api/posts/:id` | Update a specific story |
| DELETE | `/api/posts/:id` | Delete a specific story |

---

## Axios Configuration

The project uses Axios to handle HTTP requests to the Express.js backend efficiently.

**Base URL:** Controlled via the VITE_API_URL environment variable for flexibility between environments.

**Default Headers**: Sets `Content-Type`: `application/json` to ensure all requests send and receive JSON data.

---

## How to Run locally

To run the app locally, simply execute the following command using bash:

1. **Clone the repository**

- git clone <repository-url>
- cd <project-folder>

2. **Install dependencies**

- npm install

3. **Configure environment variables**

- Create a `.env` file in the root and add your backend URL:
- **.env URL format example**: VITE_API_URL=http://localhost:3000

4. **Run the web app**

- npm run dev
