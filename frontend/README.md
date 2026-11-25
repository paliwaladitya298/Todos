# Taskflow

## Run locally

Start the backend from `backend` with `npm run dev`, then start the frontend from
`frontend` with `npm run dev`. The backend listens on port 3000 and the frontend
uses `http://localhost:5173` by default.

The backend allows credentialed requests from `http://localhost:5173` by
default. Set `FRONTEND_URL` in the backend environment if the frontend uses a
different origin. To point the frontend at a different backend, set
`VITE_API_URL` in the frontend environment (for example,
`http://localhost:3000`).
