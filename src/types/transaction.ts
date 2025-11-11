export interface BalanceResponse {
  data: {
    balance: number;
    currency: string;
    timestamp: string;
  };
}
export interface UploadResponse {
  message: string;
}