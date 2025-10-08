/*
  # Create Users Table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for each user
      - `name` (text) - User's full name
      - `email` (text, unique) - User's email address
      - `created_at` (timestamptz) - Timestamp when the user was created

  2. Security
    - Enable RLS on `users` table
    - Add policy for anyone to insert users (public registration)
    - Add policy for anyone to read all users (public visibility)

  3. Important Notes
    - Email addresses must be unique
    - Created timestamp is automatically set to current time
    - Table is accessible for public read and write operations
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert users"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read users"
  ON users
  FOR SELECT
  TO anon
  USING (true);