import styles from '@/styles/Balance.module.css';

export default function Balance() {
  return (
    <div className={styles.container}>
			<h2 className={styles.title}>Balance</h2>
			<div className={styles.balanceValue}>
				Rp 10.000.000
			</div>
		</div>
  );
}