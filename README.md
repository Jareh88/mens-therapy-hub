# Men's Therapy Hub

A modern directory that helps men find the right therapist - built with **Next 15 / React 19**, **Payload CMS**, **PostgreSQL** and **MUI v6**.

The repo is structured as a **single Next.js project** that _embeds_ Payload (no separate server).  
Everything - marketing pages, therapists, blog posts - is stored in Payload and surfaced via typed GraphQL / REST and direct server‑calls (`req.payload`).

---

## ⚡️ Quick start

```bash
git clone https://github.com/YourOrg/mth.git
cd mth
cp .env.example .env.local           # fill in the blanks
npm i
npm run dev                          # http://localhost:3000
```

---

## 🗂️ Project layout

```
.
├── src/
│   ├── app/                      # Next.js 15 ‑ App Router
│   │   ├── (frontend)/           # regular site routes
│   │   ├── (payload)/admin/      # Payload Admin UI (iframe)
│   │   └── api/                  # edge/serverless helpers
│   ├── collections/              # Payload collections (TS)
│   ├── components/               # shared React components
│   ├── constants/                # design‑tokens, theme colours
│   ├── lib/                      # client/server utilities
│   ├── middleware.ts             # auth cookies → req.user
│   └── types/                    # generated Payload types
├── public/
├── payload.config.ts             # bootstraps CMS & plugins
├── jest.config.mjs
└── vercel.json                   # (optional, can see potential choices in debuggingstagingvercel.json) build + edge/runtime opts
```

> **Generated types** live in `src/types` (`npm run generate:types`).

---

## 🧱 Tech stack

| Layer     | Choice                                     | Notes                                             |
| --------- | ------------------------------------------ | ------------------------------------------------- |
| Front-end | **Next.js 15 (App Router)**                | React 19, Server / Client Components, RSC caching |
| Styling   | **MUI v6** + Emotion                       | Theme in `src/constants/theme.ts`                 |
| CMS       | **Payload CMS** (`local: true`)            | runs inside Next serverless function              |
| DB        | **PostgreSQL**                             | Prisma not needed – Payload owns schema           |
| Mail      | Nodemailer (dev) \| SMTP / SendGrid (prod) |
| Auth      | Payload local‑strategy, JWT cookie         |
| Tests     | Jest, @testing-library/react, msw          |
| Deploy    | **Vercel** (preview & prod)                | see _Deployment_                                  |

---

## 🔧 Environment variables

| Variable                  | Required | Example / Notes                     |
| ------------------------- | -------- | ----------------------------------- |
| `DATABASE_URL`            | ✅       | `postgres://user:pass@host:5432/db` |
| `PAYLOAD_SECRET`          | ✅       | Long random string                  |
| `NEXT_PUBLIC_SITE_URL`    | ✅       | `http://localhost:3000` or prod URL |
| `SMTP_HOST`               | ✓        | Mailgun / SES / etc.                |
| `SMTP_PORT`               | ✓        | usually `587`                       |
| `SMTP_USER` / `SMTP_PASS` | ✓        |                                     |
| `APPROVAL_WEBHOOK_URL`    | optional | POSTs JSON when therapist approved  |

See `.env.example` for the authoritative list.

---

## 📜 NPM scripts

| Command          | What it does                                         |
| ---------------- | ---------------------------------------------------- |
| `dev`            | `next dev` + Payload in local‑mode                   |
| `build`          | `next build` (Payload initialises for type‑gen only) |
| `start`          | `next start`                                         |
| `generate:types` | `payload generate:schema-types --output src/types`   |
| `test`           | Jest unit + component tests                          |
| `lint`           | ESLint + Prettier                                    |

---

## 🗄️ Payload CMS overview

| Collection     | Purpose                                                               | Role‑based access                                                                                                                        |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **users**      | Auth entities<br/>Fields: `email`, `name`, `role` (`admin│therapist`) | create ✅ • self read/update • admin CRUD                                                                                                |
| **therapists** | Public profiles                                                       | - **owner** (relationship → users)<br/>- **approvalStatus** (`pending/approved/rejected`, sidebar)<br/>- Large profile schema (see file) | create ↳ logged‑in user<br/>read ↳ public if `approved`<br/>update/delete ↳ owner or admin |
| **media**      | Images / uploads                                                      | default                                                                                                                                  |

**Hooks**

1. **`ensureSingleProfile`** – non‑admins can create _one_ therapist profile max.
2. **`notifyApprovalChange`** – fires email + optional webhook when status flips.
3. **`makeFirstUserAdmin`** (users) – first account becomes `admin`.

---

## 🔐 Auth & RBAC flow

1. User hits **/signup** → Payload `POST /api/users/register`.
2. Default role = `therapist`, first user created on new environment for website will be `admin`.
3. They can now create a single `therapists` doc (`owner = user.id`, `approvalStatus = pending`).
4. **Admin** sees pending items (sidebar field visible only to admins), toggles _Approved_.
5. Hook emails the therapist and un‑hides the profile publicly.

---

## ✅ Testing

```
npm run test         # all suites
npm run test -u      # update snapshots
```

- **Component** tests live next to components (`.test.tsx`).
- MUI rendered with `createRender` helper to get Emotion SSR classes.
- Mock server (`msw`) stands in for Payload REST calls.

CI example (`.github/workflows/ci.yml`) included – runs lint + tests on PR.

---

## ☁️ Deploying on Vercel

1. **Project → Settings → Environment Variables**  
   add every key from `.env.example` (make sure `PAYLOAD_SECRET` + `DATABASE_URL`).
2. In **Build & Output settings** leave default:
   - Build command: `npm run build`
   - Output dir: `.next`
3. Add a **PostgreSQL** add‑on (Neon, Supabase, PlanetScale etc.) or point to an external cluster.
4. (Optional) In `vercel.json` set
   ```json
   { "build": { "env": { "PAYLOAD_SKIP_INIT": "1" } } }
   ```
   to stop Payload contacting the DB during `next build`.
5. Push → preview deploy → merge → production.

### Self‑host

Run `docker-compose up -d` using the provided stack in `ops/docker/*`  
(Next.js server + Node mailer + Postgres 15).

---

## 🚧 Roadmap / outstanding work

| Area                  | Todo                                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Forms**             | Front‑end for Contact & Therapist signup pages; wire to `/api` route calling Payload REST.                     |
| **Admin UI**          | Surface `approvalStatus` in collection list (custom column) and investigate MUI theme override to match brand. |
| **Directory filters** | Add pagination, combinable filters (age range + specialisms) backed by Payload GraphQL.                        |
| **E‑mail**            | Switch to production transporter (SendGrid, Resend, SES).                                                      |
| **Accessibility**     | Audit with Lighthouse + axe; improve colour contrast.                                                          |
| **Payments**          | Out‑of‑scope placeholder: Stripe Checkout link in therapist profile.                                           |

---

## 🤝 Handover & support

- 1 × 60 min live walkthrough (setup, codebase, deployment).
- Slack / email Q&A for 14 days after hand‑off.
