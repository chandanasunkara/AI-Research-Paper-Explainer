# AI Research Paper Translator

Make research papers easy to understand with AI. Upload any PDF and get an instant, student-friendly breakdown: summary, key contributions, technical concepts, ELI12 explanation, and an interactive quiz.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **AI:** Google Gemini 2.0 Flash
- **PDF:** pdf-parse

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create `.env.local` at the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Set `GEMINI_API_KEY` in the Vercel dashboard.

## Features

- PDF upload (max 10 MB)
- Plain-language summary
- Key contributions (3–6 bullet points)
- Technical concepts with simple explanations (accordion)
- Explain Like I'm 12 (analogies and everyday language)
- Interactive 5-question quiz with explanations
