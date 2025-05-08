# Men’s Therapy Hub

A modern directory platform connecting men with therapists. Built using a modern stack for performance, scalability, and maintainability. This document serves as a developer handover and setup reference.

---

## 🧱 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Material-UI (MUI v6) with Emotion (SSR configured)
- **CMS/Backend**: Payload CMS (headless)
- **Database**: PostgreSQL
- **Email**: Payload built-in mailer (Nodemailer), with potential for SendGrid/SMTP integration
- **Deployment Target**: Vercel currently

---

## 📦 Requirements

- Node.js `22.x` or newer
- PostgreSQL instance (local or cloud-hosted)
- npm for dependency management

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone <url>
cd mth
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and include the following:

```env
DATABASE_URL=postgres://username:password@localhost:5432/dbname
PAYLOAD_SECRET=your-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# For email support as required:
EMAIL_FROM=no-reply@yourdomain.com
EMAIL_TRANSPORT=nodemailer
SMTP_HOST=smtp.yourmail.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
```

> Replace values with your actual database and SMTP credentials.

---

### 4. Generate Payload Types (Optional)

If you've changed Payload collections/config:

```bash
npm run generate:types
```

---

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## ✅ Feature Implementation Status

| Feature                       | Status          | Notes                                                        |
| ----------------------------- | --------------- | ------------------------------------------------------------ |
| Homepage                      | ✅ Complete     | Fully dynamic via CMS                                        |
| About Page                    | ✅ Complete     | Fully dynamic via CMS                                        |
| Therapist Directory           | ✅ Mostly done  | CMS integration and filter logic working, pagination pending |
| Individual Therapist Profiles | ✅ Complete     | Linked from directory                                        |
| Navigation (Header/Footer)    | ✅ Complete     | Fully functional                                             |
| Blog / Library Layout         | ✅ Mostly done  | Categories & media hooked up, tags optional                  |
| Contact Form                  | 🔄 Partially    | Backend form created, needs frontend integration             |
| Therapist Signup Form         | 🔄 Partially    | Backend ready, frontend component pending                    |
| Admin Approval System         | ❌ Not started  | CMS-level logic and UI needed                                |
| Admin Auth                    | ✅ Complete     | Using Payload built-in                                       |
| Therapist Auth                | ❌ Not started  | Needs implementing in Payload                                |
| Email Notifications           | 🔄 Partially    | Setup started, requires production config                    |
| SEO / Metadata                | ✅ Setup done   | `Head` tags in place, CMS driven                             |
| Mobile Responsiveness         | ✅ Complete     | Fully tested                                                 |
| Deployment Config             | ❌ Not started  | Will require `.env`, DNS, SMTP, etc                          |
| Payment/Subscription          | 🔄 Out of scope | Placeholder strategy discussed (Stripe via external link)    |

---

## 🚧 Outstanding Tasks

- Create frontend form elements and wire up forms (contact, therapist signup) to frontend
- Finalise auth tiers (admin vs therapist)
- Add frontend for therapist application and admin approval workflow
- Production email transport config (SMTP or SendGrid) if needed
- Deployment setup and QA
- Optional: Finish live preview implementation in cms
- Add rest of unit testing

---

## 🤝 Handover Support

- 📞 1x 60-minute walkthrough call (on request)
- 📝 Handover doc with outstanding tasks
- 📂 Repo & CMS access: credentials to be provided on request

---

## 🙏 Final Notes

This project was developed with attention to performance, best practices, and modern tooling. Remaining features are scoped and achievable within \~10–15 developer days (if familiar with tech stack).

The codebase should be straightforward for a developer familiar with React, Typescript & Next.js. Familiarity with Payload CMS would be a bonus.
