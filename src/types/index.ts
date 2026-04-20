export type UserRole =
  | "admin"
  | "back_office"
  | "back_office_manager"
  | "front_office"
  | "front_office_manager"
  | "viewer";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  phone?: string;
  created_at: string;
  updated_at: string;
}
