# Center App

## Running with CMS (recommended)

To edit screen content and serve the app with a backend:

1. Install dependencies: `npm install`
2. Start the server: `npm start` (runs on port 3000)
3. Open the app: http://localhost:3000/
4. Open the CMS to edit content: http://localhost:3000/cms.html

Locally, content is served from `content.json` (see `server.js`). The CMS loads current content, lets you edit by screen, and save. Reload the main app to see changes.

## Deploying to Vercel (production)

The app can be deployed to Vercel. The `/api/content` endpoint is implemented as a serverless function in `api/content.mjs` and uses **Vercel Postgres** (or another Postgres provider via the Marketplace) to store content.

### Postgres setup

1. In the [Vercel project](https://vercel.com/dashboard), go to **Storage** (or **Integrations**) and add a **Postgres** database (e.g. [Neon](https://vercel.com/marketplace/neon) from the Marketplace).
2. Link the database to the project. Vercel will set the **`POSTGRES_URL`** environment variable (or the variable name shown by your provider).
3. Create the `content` table and seed it once. You can run the schema and seed from your machine with the same `POSTGRES_URL`:
   - **Option A – run the seed script:** Set `POSTGRES_URL` in your environment (e.g. copy from Vercel → Settings → Environment Variables), then run:
     ```bash
     npm run seed
     ```
     This creates the table (if it doesn’t exist) and upserts `home`, `what`, `why`, and `how` from `content.default.json`.
   - **Option B – run SQL manually:** In your Postgres SQL console, run the statements in `sql/schema.sql`, then run `npm run seed` to load default content.
4. Redeploy. The app and CMS will read/write content via the Postgres-backed API.

### Behavior

- **GET /api/content** returns the full content object `{ home, what, why, how }`. Any section missing in the database is filled from `content.default.json`.
- **PUT /api/content** expects the full object and upserts each section into the `content` table.
- Keep `content.default.json` in the repo as the source of default content and for seeding.
