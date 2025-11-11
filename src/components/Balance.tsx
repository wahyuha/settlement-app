import styles from '@/styles/Balance.module.css';
interface BalanceDisplayProps {
  balance: number | null;
  loading: boolean;
}

export default function Balance({ balance, loading }: BalanceDisplayProps) {
  return (
    <div className={styles.container}>
			<h2 className={styles.title}>Balance</h2>
			<div className={styles.balanceValue}>
				{loading ? (
					<span className={styles.loading}>Loading...</span>
					) : balance !== null ? (
					<span className={styles.balanceValue}>{balance}</span>
					) : (
					<span className={styles.noData}>No data available</span>
					)}
			</div>
		</div>
  );
}