export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};