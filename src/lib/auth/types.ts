export type RegisterRequestBody = {
  email: string;
  password: string;
  password2?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type AuthApiError = {
  detail?: string;
  error?: string;
  [key: string]: unknown;
};

export type UserProfile = {
  id?: number;
  email?: string;
  role?: string;
  date_joined?: string;
  last_login?: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar?: string | null;
    bio?: string;
    birth_date?: string | null;
  };
};

export type AuthSuccessResponse = {
  user: UserProfile | null;
  token: string;
};
