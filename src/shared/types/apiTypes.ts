export interface ApiResponse<T> {
  status: "success" | "error";
  code: number;
  data: T;
}