# Prompt AI 🧠✨

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)](https://mongodb.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4-green?logo=next-auth)](https://next-auth.js.org/)

**Prompt AI** is an open-source AI prompting platform for the modern world. Discover, create, and share creative AI-powered prompts with a vibrant community. Built with cutting-edge technologies for seamless user experience.

## ✨ Features

- **Discover & Share**: Browse trending AI prompts via interactive feeds, filter by tags.
- **Create Prompts**: Easily craft new prompts with rich form UI.
- **User Profiles**: View profiles, manage your posts.
- **Authentication**: Secure sign-in with NextAuth (Google, etc.), responsive design.
- **Responsive**: Works on desktop, tablet, mobile with Tailwind CSS.
- **API-Driven**: Full CRUD for prompts/users with MongoDB backend.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4 |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js v4, bcrypt |
| Utils | Custom DB connection, models |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier OK) for `MONGODB_URI`
- NextAuth providers setup (e.g., Google OAuth)

### Setup
1. Clone/fork the repo:
   ```bash
   git clone <your-repo>
   cd prompt-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with:
   ```
   MONGODB_URI=your_mongodb_atlas_uri_here?retryWrites=true&w=majority
   NEXTAUTH_SECRET=generate_with_openssl_rand_-base64_32
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_oauth_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_secret
   ```
   *Tip: Use MongoDB Atlas, encode special chars in URI.*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### Build & Start
```bash
npm run build
npm start
```

## 📁 Project Structure
```
prompt-ai/
├── app/              # App Router pages & API routes
│   ├── api/          # API: prompts CRUD, users, auth
│   ├── create-prompt/
│   ├── profile/
│   └── page.jsx      # Home with Feeds
├── components/       # Reusable: Nav, Feeds, PromptCard, Form
├── models/           # Mongoose: User, Prompt
├── utils/            # DB connection
├── public/assets/    # Logo, icons
└── styles/           # globals.css
```

## 🔗 API Endpoints
- `POST/GET/DELETE /api/prompt` - Manage prompts
- `GET /api/users/[id]/posts` - User posts
- `/api/auth/[...nextauth]` - Auth

## ☁️ Deployment
Deploy to [Vercel](https://vercel.com) with one click:
1. Push to GitHub.
2. Import to Vercel, add env vars.
3. Auto-deploys! [Vercel Next.js Guide](https://nextjs.org/docs/app/building-your-application/deploying)

## 🤝 Contributing
1. Fork & clone.
2. Create feature branch: `git checkout -b feature/amazing`.
3. Commit: `git commit -m 'Add amazing feature'`.
4. Push & PR.

Issues & PRs welcome!

## 📄 License
MIT License - see [LICENSE](LICENSE) (add if needed).

## 🙌 Acknowledgments
Built inspired by modern AI tools. Star on GitHub if useful! ⭐
