export type TransactionType = 'DEBIT' | 'CREDIT';
export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export interface Transaction {
  timestamp: string;
  name: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
}
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

export interface IssuesResponse {
  data: {
    items: Transaction[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  };
}