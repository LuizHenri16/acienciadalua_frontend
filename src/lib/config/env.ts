// Keep the `process.env.NEXT_PUBLIC_API_URL` access literal so Next.js can inline
// it at build time (required by the Docker build). Do not refactor this access.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
