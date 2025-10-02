interface ResponsibleUser {
  fio: string;
}

interface Act {
  status: string;
  file_url: string;
}

export interface IObject {
  id: string;
  using_id: string;
  status: string;
  object_type: "active"| "not_active" | "agreement" | "act_opening";
  title: string;
  general_info: string;
  responsible_user_id: string;
  city: string;
  date_delivery_verification: string;
  responsible_user: ResponsibleUser;
  act: Act;
  "is_nfc": boolean,
}

export interface ActDocx {
  code: string;
  title: string;
  description: string;
  status: "yes" | "no" | "not_required";
}

export interface ICheckListRequest {
  contractor_id: string;
  date_verification: string;
  act_docx: ActDocx[];
}

export interface IResponsibleUser {
  id: string;
  using_id: number;
  avatar: string;
  email: string;
  fio: string;
  role: "construction_control" | string; // если будут другие роли, можно расширять
}

export type Coords = Array<[number, number]>;
export type Polygon = Coords;
export type MultiPolygon = Polygon[];

export interface IFullObject {
  id: string;
  using_id: string;
  status: "lead" | string; // если будут другие статусы, можно расширять
  object_type: "active" | "not_active" | "agreement" | "act_opening" // аналогично
  created_at: string; // ISO строка
  updated_at: string; // ISO строка
  general_info: string;
  title: string;
  city: string;
  date_delivery_verification: string; // ISO строка
  start_date: string; // ISO строка
  coords: number[][][] | number[][];
  responsible_user: IResponsibleUser;
}