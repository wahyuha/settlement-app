import { Transaction, TransactionStatus } from '@/types/transaction';
import styles from '@/styles/TransactionTable.module.css';
import { formatCurrency, formatDate } from '@/utils/formatter';

interface TransactionTableProps {
  issues: Transaction[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  onPaginationChange: (page: number, limit: number) => void;
  loading: boolean;
}

export default function TransactionTable({ issues, pagination, loading, onPaginationChange }: TransactionTableProps) {
  const handleSort = (field: string) => {
    console.log('sorting', field);
  };

  const getStatusClass = (status: TransactionStatus): string => {
    switch (status) {
      case 'PENDING':
        return styles.statusPending;
      case 'FAILED':
        return styles.statusFailed;
      default:
        return '';
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading transactions...</div>;
  }

  if (issues && issues.length === 0) {
    return <div className={styles.noData}>No pending transactions</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Non-Successful Transactions</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={styles.sortable}
                onClick={() => handleSort('timestamp')}
              >
                Timestamp 
              </th>
              <th
                className={styles.sortable}
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th>Type</th>
              <th
                className={styles.sortable}
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              <th
                className={styles.sortable}
                onClick={() => handleSort('status')}
              >
                Status
              </th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {issues && issues.length > 0 && issues.map((issue, index) => (
              <tr key={`${issue.timestamp}-${index}`}>
                <td>{formatDate(issue.timestamp)}</td>
                <td>{issue.name}</td>
                <td>{issue.type}</td>
                <td className={styles.amount}>{formatCurrency(issue.amount)}</td>
                <td>
                  <span className={`${styles.status} ${getStatusClass(issue.status)}`}>
                    {issue.status}
                  </span>
                </td>
                <td>{issue.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => onPaginationChange(pagination.page - 1, pagination.limit)}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>

          <span className={styles.pageInfo}>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            className={styles.paginationButton}
            onClick={() => onPaginationChange(pagination.page + 1, pagination.limit)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
