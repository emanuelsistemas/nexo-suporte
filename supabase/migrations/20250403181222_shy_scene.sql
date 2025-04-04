/*
  # Disable RLS on profiles table

  1. Changes
    - Disable Row Level Security on profiles table
    - Drop existing policies as they won't be needed
*/

-- Disable RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;