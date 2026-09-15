# JobBase V2.0 🚀

> **India's Top Early-Career Technology Opportunity Platform**

JobBase tracks fresh openings, off-campus drives, entry-level software engineering roles, and internships in real time — empowering candidates to apply directly through official employer portals before the crowd does.

---

## ✨ Features

- **⚡ Real-Time Job Tracking**: Instant updates on entry-level software engineering roles, off-campus drives, and tech internships.
- **🎨 Modern Responsive Design**: Mobile-first layout crafted with bespoke typography and custom brand color system.
- **🧰 Candidate Tools**:
  - **CGPA Converter**: Standardized GPA-to-Percentage calculation tool.
  - **Cold Email & Referral Generator**: Automated outreach drafting for tech referrals.
- **📧 Newsletter & Alert System**: Direct notification system for newly posted tech opportunities.
- **🔍 Fast Search & Filtering**: Multi-criteria URL-driven filtering by domain, location, batch, work mode, and experience.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), Custom Design System
- **Icons**: [Lucide React](https://lucide.dev/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS for job postings & resources)
- **Database / Backend**: [Supabase](https://supabase.com/) & Next.js API Routes
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🎨 Typography & Design System

JobBase features a curated typography and color system:

- **Headings & Titles**: `Instrument Serif`
- **Sub-headings & UI Elements**: `Inter`
- **Body & Paragraphs**: `IBM Plex Serif`
- **Color Palette**:
  - **Primary**: `#f97415` (Vibrant Brand Orange)
  - **Secondary**: `#dddbff` (Soft Lavender Accent)
  - **Text**: `#050316` (Deep Midnight Dark)
  - **Background**: `#fbfbfe` (Soft Off-White)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jobbase02/jobbaseV2.O.git
   cd jobbaseV2.O
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
jobbaseV2.O/
├── public/                # Static assets, fonts, and wave backgrounds
│   ├── IBM_Plex_Serif/   # Local IBM Plex Serif TTF font files
│   ├── Instrument_Serif/ # Local Instrument Serif TTF font files
│   └── Inter/            # Local Inter TTF font files
├── src/
│   ├── app/               # Next.js App Router pages & API routes
│   │   ├── api/           # Newsletter & backend API routes
│   │   ├── tools/         # CGPA Converter & Cold Email Generator
│   │   ├── globals.css    # Global Tailwind styles & font rules
│   │   ├── layout.tsx     # Root layout & Navigation wrapper
│   │   └── page.tsx       # Server-side home page
│   ├── components/        # React Client Components (HomeClient, Navbar, JobCard, etc.)
│   ├── lib/               # Sanity & Supabase client configurations
│   └── types/             # TypeScript type definitions
└── tailwind.config.ts     # Tailwind configuration with font families
```

---

## 📄 License

This project is private and maintained for **JobBase**. All rights reserved.
