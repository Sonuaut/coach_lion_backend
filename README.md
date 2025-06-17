# Authentication Service

A TypeScript-based authentication service using Supabase for authentication and database management.

## Features

- User registration and authentication
- Email and phone number verification
- Session management
- Secure password handling
- TypeScript support
- Express.js backend

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Redis server (for session management)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   - Get your Supabase URL and anon key from your Supabase project settings
   - Set up a secure JWT secret
   - Configure your Redis connection

5. Create the required Supabase tables:
   ```sql
   create table public.users (
     id uuid references auth.users on delete cascade,
     name text not null,
     phone numeric not null unique,
     email text,
     is_active boolean default true,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );

   -- Enable RLS
   alter table public.users enable row level security;

   -- Create policies
   create policy "Users can view their own data" on public.users
     for select using (auth.uid() = id);

   create policy "Users can update their own data" on public.users
     for update using (auth.uid() = id);
   ```

## Development

Run the development server:
```bash
npm run dev
```

## Production

Build and run the production server:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 1234567890,
    "password": "securepassword"
  }
  ```

- `POST /api/v1/auth/login` - Login
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- `POST /api/v1/auth/logout` - Logout (requires authentication)
- `GET /api/v1/auth/me` - Get current user profile (requires authentication)

## Error Handling

The service uses a centralized error handling system with proper HTTP status codes and error messages.

## Security

- Password hashing using bcrypt
- JWT for session management
- Supabase Row Level Security (RLS)
- Input validation using Zod
- CORS enabled
- Helmet for security headers