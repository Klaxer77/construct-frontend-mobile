export type DocumentStatus = "yes" | "no" | "not_required";
export type VerificationStatus = "verified";

export interface Document {
  id: string;      
  code: string;
  title: string;
  status: DocumentStatus;
  description: string;
}

export interface CheckListData {
  id: string;                
  file_url: string;
  status: VerificationStatus;
  date_verification: string;
  documents: Document[];
}

export interface CheckListResponse {
  data: CheckListData;
}