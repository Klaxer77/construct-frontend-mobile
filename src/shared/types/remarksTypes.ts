export interface IRemark {
  id: string;
  object_name: string;
  responsible_user_name: string;
  status: RemarkStatus;
  date_violation?: string;
  date_remark?: string; // ISO дата
  expiration_date: string; // ISO дата
}

export type RemarkStatus = "fixed" | "not_fixed" | "review"