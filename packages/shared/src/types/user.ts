export interface User {
  id: string;
  email: string;
  name: string;
  role: 'learner' | 'admin';
  oauth_provider: string;
  oauth_subject_id: string;
  is_active: boolean;
  created_at: string;
  last_active_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'learner' | 'admin';
}

export interface JwtPayload extends AuthUser {
  sub: string;
  iat: number;
  exp: number;
}
