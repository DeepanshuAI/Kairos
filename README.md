# Kairos Resort Website Concept

Kairos is an interactive resort website concept built with React, TypeScript, and Vite. It combines a scroll driven 3D presentation with room, location, resort information, and client-side booking interface flows.

## What is implemented

- A 3D resort presentation using Three.js and React Three Fiber.
- Resort, room, amenities, dining, and location views populated from local seed data.
- Room selection, date and capacity checks, and price calculations in the client.
- Booking, contact, newsletter, and admin interface flows backed by a browser-local data store.
- Scroll animations and responsive page sections.

## Demo data and scope

This repository is a frontend concept. Resort identity, address, pricing, reviews, booking records, and contact details in `src/database/seedData.ts` are example content. The app stores edits in browser `localStorage` (with an in-memory fallback); it does not connect to a booking backend, payment provider, or real resort service. Do not use its displayed prices or reservation state for real bookings.

The project does not include a checked-in screenshot set or automated test script.

## Stack and structure

- React 19 and TypeScript
- Vite 8 and Tailwind CSS 4
- Three.js, React Three Fiber, and Drei for 3D scenes
- GSAP for animation sequences
- `src/components/`: page sections, navigation, modals, and 3D experience components
- `src/database/`: TypeScript types and browser-local seed data/store
- `src/services/`: client-side booking, room, contact, and experience operations

## Run locally

Prerequisites: Node.js compatible with the Vite version in `package.json`, and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. No environment variables or backend service are configured in this repository.

## Build and lint

```bash
npm run build
npm run lint
```

There is no test script in `package.json`.

## Maintainer

Deepanshu Yadav · [GitHub](https://github.com/DeepanshuAI) · [Portfolio](https://portfo1io-ashen.vercel.app/)
