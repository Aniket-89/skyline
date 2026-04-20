import api from "./api";

// ============================================================
// ROLES & MOCK USERS
// ============================================================

export type UserRole = "admin" | "back_office" | "back_office_manager" | "front_office" | "front_office_manager";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
}

export interface LoginPayload { username: string; password: string; }
export interface TokenResponse { access_token: string; refresh_token: string; token_type: string; }

export const MOCK_USERS: User[] = [
  { id: "u1", full_name: "Aniket Sharma", email: "admin@skyline.com", role: "admin", is_active: true },
  { id: "u2", full_name: "Priya Sharma", email: "backoffice@skyline.com", role: "back_office", is_active: true },
  { id: "u3", full_name: "Rahul Verma", email: "bo.manager@skyline.com", role: "back_office_manager", is_active: true },
  { id: "u4", full_name: "Sneha Kulkarni", email: "frontoffice@skyline.com", role: "front_office", is_active: true },
  { id: "u5", full_name: "Vikram Singh", email: "fo.manager@skyline.com", role: "front_office_manager", is_active: true },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  back_office: "Back Office",
  back_office_manager: "Back Office Manager",
  front_office: "Front Office",
  front_office_manager: "Front Office Manager",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  admin: "#16a34a",
  back_office: "#34d399",
  back_office_manager: "#10b981",
  front_office: "#10b981",
  front_office_manager: "#f59e0b",
};

// ============================================================
// ROLE-BASED ACCESS RULES
// ============================================================

/** Which sidebar nav items each role can see */
export const ROLE_NAV_ACCESS: Record<UserRole, string[]> = {
  admin: ["/dashboard", "/projects", "/plots", "/bookings", "/customers", "/leads", "/rms", "/approvals", "/reports", "/analysis"],
  back_office: ["/dashboard", "/projects", "/plots", "/rms", "/reports"],
  back_office_manager: ["/dashboard", "/projects", "/plots", "/rms", "/approvals", "/reports", "/analysis"],
  front_office: ["/dashboard", "/bookings", "/customers", "/leads", "/reports"],
  front_office_manager: ["/dashboard", "/bookings", "/customers", "/leads", "/approvals", "/reports", "/analysis"],
};

/** Which roles can approve records */
export function canApprove(role: UserRole): boolean {
  return ["admin", "back_office_manager", "front_office_manager"].includes(role);
}

/** Which roles can create/edit master data (projects, plots, RMs) */
export function canEditMasters(role: UserRole): boolean {
  return ["admin", "back_office", "back_office_manager"].includes(role);
}

/** Which roles can create bookings/leads/customers */
export function canEditTransactions(role: UserRole): boolean {
  return ["admin", "front_office", "front_office_manager"].includes(role);
}

// ============================================================
// AUTH FUNCTIONS (DEMO MODE)
// ============================================================

const DEMO_MODE = true;

export async function login(payload: LoginPayload): Promise<TokenResponse> {
  if (DEMO_MODE) {
    return { access_token: "demo-token", refresh_token: "demo-refresh", token_type: "bearer" };
  }
  const form = new URLSearchParams();
  form.append("username", payload.username);
  form.append("password", payload.password);
  const { data } = await api.post<TokenResponse>("/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
}

export async function getMe(): Promise<User> {
  if (DEMO_MODE) {
    return getCurrentUser();
  }
  const { data } = await api.get<User>("/users/me");
  return data;
}

export function saveTokens(tokens: TokenResponse) {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  }
}

export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("demo_user");
  }
}

export function setDemoUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_user", JSON.stringify(user));
    localStorage.setItem("access_token", "demo-token");
  }
}

export function getCurrentUser(): User {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("demo_user");
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
  }
  return MOCK_USERS[0]; // fallback to admin
}

export function getCurrentRole(): UserRole {
  return getCurrentUser().role;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("access_token");
}
