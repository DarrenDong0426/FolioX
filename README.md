# FolioX

Personal portfolio site for Darren Dong. CMS-driven, theme-aware, with project detail pages, an event timeline, document hosting, and an admin panel for content management.

**Live:** [ddarren.org](https://ddarren.org)

---

## Tech Stack

- **Frontend:** React (CRA), Tailwind CSS, Framer Motion
- **Backend:** Flask, SQLAlchemy
- **Database:** Supabase Postgres
- **Storage:** Supabase Storage (image + document files)
- **Email:** Resend (OTP login + contact form)

---

## Running Locally

### Prerequisites
- Node 18+
- Python 3.11+
- Supabase project with these buckets: `content`, `Events`, `Documents`
- `.env` file in `app/` (see `.env.example`)

### Setup

```bash
# Install backend deps
cd app
pip install -r requirements.txt

# Install frontend deps
npm install
```

### Run

```bash
# Backend (port 5001)
cd app
flask --app api.main run --debug --port 5001

# Frontend (separate terminal, port 3000)
cd app
npm start
```

Open http://localhost:3000

---

## Environment Variables

Create `app/.env` with:

```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
RESEND_API_KEY=re_...
TO_EMAIL=you@example.com
ADMIN_EMAIL=you@example.com
```

---

## Admin Panel

Login at `/Login`. Enter the admin email — a 6-digit OTP is sent via Resend. Code valid for 10 minutes, 10 wrong guesses kills the token.

### Managing Content

- **Projects** — `/Admin/Projects` — CRUD with content blocks, tags, featured toggle
- **Documents** — `/Admin/Documents` — PDF upload + metadata
- **Events** — `/Admin/Events` — timeline events, optional project linking
- **FAQs / Changelog** — simple CRUD lists

### Content Blocks

Project and event detail pages use a block-based content editor. Supported types:

- `heading` — H1 through H4 text
- `paragraph` — plain text
- `image` — uploaded image with caption and size
- `video` — YouTube embed URL
- `code` — language plus code block (display only)
- `demo` — sandboxed HTML/CSS/JS that runs in an iframe

### Standard Project Page Template

Use these headings on each project for consistency:

1. **Background** — what it is, why
2. **Development** — how you built it, including challenges
3. **Reflection** — what you learned, future directions
4. **Demo** — interactive component (optional)