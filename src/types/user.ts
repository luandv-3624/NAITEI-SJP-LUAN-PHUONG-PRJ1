export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  email_verified_at: string;
  status: string;
  role: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
};
