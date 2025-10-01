export type roleUser = "construction_control" | "contractor" | "inspection";

export interface IObjectAccess {
  object_id: string;
  is_active: boolean;
  access_expires_at: string;
}

export interface IUser {
  id: string;
  using_id: number;
  avatar: string;
  email: string;
  fio: string;
  role: roleUser;
  object_access: IObjectAccess[];
}

export interface UsersRequest {
  email: string;
  password: string;
}

export interface UsersResponse {
  status: "success" | "error";
  code: number;
  data: IUser;
}