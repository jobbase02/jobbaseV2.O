# Sanity CMS Complete Beginner Setup Guide for JobBase

Welcome to Sanity CMS! Sanity is a flexible, headless CMS where you create and manage all your job posts, company logos, eligible batches, and rich descriptions without touching code.

This step-by-step guide explains **everything** you need to set up Sanity for JobBase, even if this is your very first time using Sanity.

---

## Step 1: Create a Free Sanity Account & Project

1. Go to [https://www.sanity.io](https://www.sanity.io) and click **"Get Started"** or **"Log in"**.
2. Sign in with GitHub, Google, or Email.
3. Once logged in, open your terminal in the project directory (`c:\Products\jobbase2.O`) and run:
   ```bash
   npx sanity init
   ```
4. Follow the interactive setup prompts:
   - Select **"Create new project"**.
   - Project name: Type `jobbase` and press Enter.
   - Dataset configuration: Select **"production"** (default).
   - Project output path: Press Enter to use current folder or confirm defaults.

---

## Step 2: Get Your Sanity Project ID & Credentials

1. Go to your Sanity Dashboard: [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click on your project named **jobbase**.
3. At the top of the project overview page, copy your **Project ID** (a string of ~8 random characters, e.g. `abc123xy`).
4. In your project folder, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
5. Open `.env.local` and paste your Project ID:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id_here"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

---

## Step 3: Understanding the Sanity Job Schema (`job.ts`)

Your project contains the job schema defined at `src/lib/sanity/job.ts`. This file instructs Sanity what fields every job post must have:

- **Job Title** (`title`): e.g., "Software Development Engineer - 1"
- **Slug** (`slug`): URL-friendly name generated automatically from title.
- **Company Name** (`company`): e.g., "CRED", "Stripe"
- **Company Logo** (`companyLogo`): Image upload field for official logo.
- **Location** (`location`): e.g., "Bangalore", "Remote"
- **Experience Level** (`experienceLevel`): Dropdown choice ("Fresher", "1-3 YOE", "3+ YOE").
- **Eligible Graduation Batches** (`eligibleBatches`): Multi-select tags (2021, 2022, 2023, 2024, 2025, 2026).
- **Job Domain** (`domain`): Dropdown ("IT/Software", "Design", "Product", "Core", "Non-IT").
- **Work Mode** (`workMode`): Dropdown ("Remote", "Hybrid", "Onsite").
- **Official Application URL** (`applyUrl`): Direct link to company career site.
- **Key Details** (`keyDetails`): Bullet list for bonds, stipend, shift timings.
- **Job Description** (`description`): Portable rich text editor.

---

## Step 4: Accessing Sanity Studio & Creating Job Posts

1. Start your local Next.js server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000/studio
   ```
   *(Sanity Studio is built directly inside your Next.js app!)*

3. Click **"Job Posting"** on the left navigation panel.
4. Click the green **"+" (Create new)** button.
5. Fill in the fields:
   - **Title**: `Frontend Developer`
   - Click **"Generate"** next to Slug.
   - **Company**: `Stripe`
   - Upload Company Logo.
   - Select **Experience Level**, **Eligible Batches**, and **Domain**.
   - Enter **Official Application URL** (e.g. `https://stripe.com/jobs`).
6. Click the green **"Publish"** button at the bottom right corner.

---

## Step 5: CORS Origins Setup (Crucial for Live Fetching)

To allow your website to read data from Sanity without security blocks:

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your **jobbase** project.
3. Click on the **"API"** tab at the top.
4. Scroll down to **"CORS Origins"** and click **"Add CORS Origin"**.
5. Origin: Enter `http://localhost:3000` (and your production domain later like `https://jobbase.com`).
6. Check **"Allow credentials"** and click **Save**.

---

## Step 6: Automatic Fallback Mode

> **Tip**: If you haven't connected your Sanity Project ID yet, JobBase automatically runs in **Smart Fallback Mode** using seed mock data from `src/lib/mockData.ts`. As soon as you enter your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`, JobBase will fetch directly from your live Sanity database!
