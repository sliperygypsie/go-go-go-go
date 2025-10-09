/*
  # Create Notes Table

  1. New Tables
    - `notes`
      - `id` (uuid, primary key) - Unique identifier for each note
      - `title` (text) - Title of the note
      - `content` (text) - Content/body of the note
      - `created_at` (timestamptz) - Timestamp when note was created
      - `updated_at` (timestamptz) - Timestamp when note was last updated
      - `user_id` (uuid) - Reference to the user who owns the note

  2. Security
    - Enable RLS on `notes` table
    - Add policy for users to read their own notes
    - Add policy for users to insert their own notes
    - Add policy for users to update their own notes
    - Add policy for users to delete their own notes

  3. Notes
    - This creates a simple notes app where users can create, read, update, and delete their own notes
    - Each note is tied to a user through the user_id field
    - RLS ensures users can only access their own notes
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notes"
  ON notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS notes_user_id_idx ON notes(user_id);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes(created_at DESC);
