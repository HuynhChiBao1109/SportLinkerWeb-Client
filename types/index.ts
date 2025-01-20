// Define interfaces which can reuse
export interface User {
  created_at: string | null;
  updated_at: string | null;
  user_id: string | null;
  email: string;
  password: string;
  full_name: string;
  dob: string | null;
  phone: string | null;
  avatar_url: string;
  status: string;
  role: string | null;
}
