import styles from '@/styles/FileUploader.module.css';

export default function FileUploader() {
  return (
    <div className={styles.container}>
			<div className={styles.uploadArea}>
				<input
					type="file"
					accept=".csv"
					className={styles.fileInput}
				/>
				<button
					className={styles.uploadButton}
				>
					Choose CSV File
				</button>
			</div>
		</div>
  );
}