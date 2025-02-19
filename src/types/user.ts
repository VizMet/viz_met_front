export interface User {
  id: number;
  fullName: string;
  role: { label: string; value: string };
  login: string;
  items: {
    id: number;
    title: string;
    icon: string;
    link: string;
  }[];
}

export interface UserCredentials {
  login: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
