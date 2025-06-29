# Vocare Fullstack Challenge

This project is a full-stack web application developed as part of the Vocare Fullstack Challenge. The goal is to create a SaaS solution for managing a care service to improve internal communication and automate recurring tasks.

## Project Overview

Vocare is a SaaS platform that rethinks digital health systems.  
The focus is on:

- Managing clients and patients
- Managing medication lists
- Purchasing care aids
- Organizing internal tasks and appointments (for employees and clients)
- Automating recurring processes in the care service

---

## Technologies

- [Next.js](https://nextjs.org) (Frontend & Backend via API Routes)
- [TailwindCSS](https://tailwindcss.com) (Styling)
- [shadcn/ui](https://ui.shadcn.com) (UI components)
- [Supabase](https://supabase.com) (Backend database & authentication)

---

## Features

- Monthly and weekly calendar views
- Appointment lists with filtering options (category, timeframe, client)
- Hover details for appointments (based on shadcn/ui HoverCard)
- Create, view, and edit appointments
- Connection to Supabase with prepared database schema

---

## Installation and Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn or pnpm

### Local Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

---

## Optional Refactoring Suggestion

This dynamic API route (`/api/[table]`) is designed to allow fetching data from multiple tables
such as `patients`, `categories`, or `appointments` using a single endpoint.

### Advantages

- Reduces repeated code across separate API routes.
- More flexible for future scalability and new resources.

### Disadvantages

- Slightly harder to debug.
- May allow access to unintended tables if misused, so a whitelist (`allowedTables`) is implemented as a safeguard.

### Status

Currently not used in the active version of the app – separate endpoints are preferred for stability.
However, this code is included as a foundation for future refactoring if needed.
