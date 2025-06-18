Sure! Here's a **clean `README.md` file** that only includes the **project setup instructions** in proper markdown format — no UI helper annotations, no flow explanations — just setup:

---

````markdown
# Project Setup

A Node.js + TypeScript backend using Supabase and Prisma.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the example:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

**For local Supabase:**

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54329/postgres"
SUPABASE_URL="http://127.0.0.1:54321"
SUPABASE_KEY="your-local-service-role-key"
JWT_SECRET="your-jwt-secret"
```

**For Supabase Cloud:**

```env
DATABASE_URL="postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres"
SUPABASE_URL="https://<project-ref>.supabase.co"
SUPABASE_KEY="your-service-role-key"
JWT_SECRET="your-jwt-secret"
```

5. (Optional) Run Supabase locally using Docker:

```bash
npx supabase start
```

6. Run Prisma setup:

```bash
npx prisma generate
npx prisma migrate deploy
```

## Development

Start the development server:

```bash
npm run dev
```

## Production

Build and run the production server:

```bash
npm run build
npm start
```

## Adding or Modifying Tables

1. Modify `prisma/schema.prisma`

2. Create a new migration:

```bash
npx prisma migrate dev --name <migration-name>
```

This will:

* Create a new SQL migration
* Apply it to your database
* Regenerate the Prisma client

## Switching to Supabase Cloud

1. Replace the `DATABASE_URL` in `.env` with your Supabase Cloud URL

2. Apply migrations to Supabase Cloud:

```bash
npx prisma migrate deploy
```

3. If your Supabase Cloud DB already has data, introspect the schema:

```bash
npx prisma db pull
```
