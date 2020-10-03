export interface NewPasswordData {
  emailAddress: string;
  password: string;
  password2: string;
  token: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  password2: string;
}

export interface LoginData {
  emailAddress: string;
  password: string;
}